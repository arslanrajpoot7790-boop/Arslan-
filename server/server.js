import http from 'node:http';
import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const port = Number(process.env.PORT || 8787);
const databasePath = fileURLToPath(new URL('./db.json', import.meta.url));
const frontendPath = path.resolve(path.dirname(databasePath), '..', 'dist');

async function readDatabase() {
  return JSON.parse(await readFile(databasePath, 'utf8'));
}
async function writeDatabase(database) {
  await writeFile(databasePath, `${JSON.stringify(database, null, 2)}\n`);
}
function send(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  response.end(JSON.stringify(payload));
}
async function body(request) {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}
function hashPassword(password, salt = randomUUID()) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const candidate = scryptSync(password, salt, 64);
  return timingSafeEqual(candidate, Buffer.from(key, 'hex'));
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST' });
    return response.end();
  }
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    const database = await readDatabase();
    if (request.method === 'GET' && url.pathname === '/api/products') return send(response, 200, database.products);
    if (request.method === 'POST' && url.pathname === '/api/newsletter') {
      const { email } = await body(request);
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return send(response, 400, { error: 'A valid email is required.' });
      if (!database.subscribers.some(subscriber => subscriber.email === email)) database.subscribers.push({ id: randomUUID(), email, createdAt: new Date().toISOString() });
      await writeDatabase(database);
      return send(response, 201, { message: 'You are on the list. Welcome in.' });
    }
    if (request.method === 'POST' && url.pathname === '/api/orders') {
      const { customer, items } = await body(request);
      const validEmail = typeof customer?.email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email);
      if (!customer?.name?.trim() || !validEmail || !customer?.address?.trim() || !customer?.city?.trim() || !customer?.postcode?.trim() || !Array.isArray(items) || !items.length) {
        return send(response, 400, { error: 'Valid customer details and at least one item are required.' });
      }

      const requestedQuantities = new Map();
      for (const item of items) {
        const productId = Number(item?.id);
        const quantity = Number(item?.quantity);
        if (!Number.isSafeInteger(productId) || !Number.isSafeInteger(quantity) || quantity < 1) {
          return send(response, 400, { error: 'Each item must have a valid product and quantity.' });
        }
        requestedQuantities.set(productId, (requestedQuantities.get(productId) || 0) + quantity);
      }

      const orderItems = [];
      for (const [productId, quantity] of requestedQuantities) {
        const product = database.products.find(candidate => candidate.id === productId);
        if (!product) return send(response, 400, { error: 'An order item is not available.' });
        if (quantity > product.stock) return send(response, 409, { error: `${product.name} does not have enough stock.` });
        orderItems.push({ productId: product.id, name: product.name, price: product.price, quantity });
      }

      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      for (const item of orderItems) {
        const product = database.products.find(candidate => candidate.id === item.productId);
        product.stock -= item.quantity;
      }
      const orderCustomer = Object.fromEntries(['name', 'email', 'address', 'city', 'postcode'].map(key => [key, customer[key].trim()]));
      const order = { id: `NL-${Date.now().toString(36).toUpperCase()}`, customer: orderCustomer, items: orderItems, total, status: 'received', createdAt: new Date().toISOString() };
      database.orders.push(order);
      await writeDatabase(database);
      return send(response, 201, { orderId: order.id, total: order.total, message: 'Thank you. Your order is confirmed.' });
    }
    if (request.method === 'POST' && url.pathname === '/api/auth/register') {
      const { name, email, password } = await body(request);
      if (!name || !email || !password || password.length < 6) return send(response, 400, { error: 'Name, valid email and a 6-character password are required.' });
      if (database.users.some(user => user.email === email)) return send(response, 409, { error: 'An account with this email already exists.' });
      database.users.push({ id: randomUUID(), name, email, password: hashPassword(password), createdAt: new Date().toISOString() });
      await writeDatabase(database);
      return send(response, 201, { message: 'Account created successfully.' });
    }
    if (request.method === 'POST' && url.pathname === '/api/auth/login') {
      const { email, password } = await body(request);
      const user = database.users.find(candidate => candidate.email === email);
      if (!user || !verifyPassword(password || '', user.password)) return send(response, 401, { error: 'Email or password is incorrect.' });
      return send(response, 200, { user: { id: user.id, name: user.name, email: user.email }, message: 'Signed in successfully.' });
    }
    return send(response, 404, { error: 'Route not found.' });
  } catch (error) {
    console.error(error);
    return send(response, 500, { error: 'The server could not complete that request.' });
  }
});

server.listen(port, () => console.log(`North & Loom API running at http://localhost:${port}`));
