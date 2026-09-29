import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Heart,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  User,
  X,
} from 'lucide-react';

const heroSlides = [
  {
    title: 'Fresh drops for smarter living',
    subtitle: 'Upgrade your everyday with premium essentials made to feel effortless.',
    cta: 'Shop New Arrivals',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
    accent: 'Spring / Summer 2026',
  },
  {
    title: 'Deals worth adding to cart',
    subtitle: 'Curated discounts, limited-stock bundles, and value finds for every room.',
    cta: 'Explore Deals',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    accent: 'Weekend Flash Sale',
  },
  {
    title: 'Built for comfort, designed to last',
    subtitle: 'Minimal pieces with premium quality and practical features for daily use.',
    cta: 'See Best Sellers',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
    accent: 'Customer Favorite',
  },
];

const categories = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80' },
  { name: 'Sale', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=700&q=80' },
];

const initialProducts = [
  {
    id: 1,
    name: 'Aero Smart Watch',
    category: 'Electronics',
    price: 24999,
    originalPrice: 32999,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    badge: 'Hot Deal',
    rating: 4.8,
    reviewCount: 214,
    stock: 8,
    description: 'A premium smartwatch with health tracking, GPS, and all-day battery life for busy routines.',
    features: ['GPS + heart rate tracking', '5 ATM water resistance', 'Up to 7-day battery'],
    colors: ['Midnight', 'Silver', 'Rose'],
    sizes: ['38mm', '42mm', '46mm'],
  },
  {
    id: 2,
    name: 'Nova Everyday Jacket',
    category: 'Men',
    price: 8999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    badge: 'Best Seller',
    rating: 4.7,
    reviewCount: 128,
    stock: 14,
    description: 'Lightweight layering with a clean silhouette and durable finish for daily wear.',
    features: ['Water-resistant finish', 'Soft brushed inside', 'Easy everyday fit'],
    colors: ['Stone', 'Black', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Luna Silk Dress',
    category: 'Women',
    price: 7499,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    badge: 'New',
    rating: 4.9,
    reviewCount: 176,
    stock: 5,
    description: 'A flowy silhouette that balances classic elegance with a relaxed, modern feel.',
    features: ['Soft-sheen satin touch', 'Easy drape and comfort', 'Ideal for day-to-night'],
    colors: ['Blush', 'Ivory', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'Echo Wireless Speaker',
    category: 'Electronics',
    price: 15999,
    originalPrice: 21999,
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    badge: 'Limited',
    rating: 4.6,
    reviewCount: 87,
    stock: 3,
    description: 'Deep sound, modern build, and portable battery power perfect for home or travel.',
    features: ['360° sound', '12-hour playtime', 'Bluetooth 5.3'],
    colors: ['Charcoal', 'Sand'],
    sizes: ['Standard'],
  },
  {
    id: 5,
    name: 'Serein Urban Tote',
    category: 'Women',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
    badge: 'Top Rated',
    rating: 4.9,
    reviewCount: 336,
    stock: 18,
    description: 'Roomy, structured, and easy to carry with a premium finish for daily city outings.',
    features: ['Large capacity', 'Sturdy straps', 'Water-repellent outer layer'],
    colors: ['Cream', 'Camel', 'Black'],
    sizes: ['One Size'],
  },
  {
    id: 6,
    name: 'Summit Travel Backpack',
    category: 'Men',
    price: 6799,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
    badge: 'Sale',
    rating: 4.8,
    reviewCount: 92,
    stock: 11,
    description: 'A durable everyday backpack that fits work essentials and quick weekend escapes.',
    features: ['Laptop sleeve', 'Hidden pockets', 'Waterproof base'],
    colors: ['Forest', 'Graphite'],
    sizes: ['Regular'],
  },
];

const reviews = [
  {
    name: 'Ayesha',
    title: 'Loved the quality',
    text: 'The fabric feels premium and the delivery was super fast. The details are exactly as shown online.',
    rating: 5,
  },
  {
    name: 'Usman',
    title: 'Excellent service',
    text: 'Support replied within minutes and the checkout experience was smooth. Will definitely order again.',
    rating: 5,
  },
  {
    name: 'Maham',
    title: 'Worth every rupee',
    text: 'Got the exact shade I wanted. The product page gave enough info and the ordering process was simple.',
    rating: 4,
  },
];

const faqData = [
  { question: 'Delivery kitne din mein hoti hai?', answer: 'Most orders are delivered within 3–5 working days across major cities and 5–7 days for remote locations.' },
  { question: 'Return process kaise hota hai?', answer: 'You can request a return within 7 days of delivery for unused products in original condition. We share pickup details after approval.' },
  { question: 'Payment methods kya available hain?', answer: 'We support credit/debit cards, bank transfer, Easypaisa, and cash on delivery for eligible orders.' },
  { question: 'Stock status kya update hota rehta hai?', answer: 'Product cards show live stock availability, and limited items display clear alerts like “Only 2 Left”.' },
];

const currency = value => `PKR ${value.toLocaleString('en-PK')}`;

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([2]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqIndex, setFaqIndex] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/products')
      .then(response => {
        if (!response.ok) throw new Error('Products could not be loaded.');
        return response.json();
      })
      .then(items => {
        if (cancelled || !Array.isArray(items) || !items.length) return;
        setProducts(items);
        setSelectedProduct(current => items.find(item => item.id === current.id) || items[0]);
      })
      .catch(error => console.error(error));

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const suggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    return products
      .filter(product => product.name.toLowerCase().includes(query))
      .slice(0, 5)
      .map(product => product.name);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchTerm]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product, quantity = 1) => {
    if (product.stock < 1) return;
    setCart(current => {
      const existingProduct = current.find(item => item.id === product.id);
      if (existingProduct) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }

      return [...current, { ...product, quantity: Math.min(product.stock, quantity) }];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (id, delta) => {
    setCart(current =>
      current
        .map(item => {
          if (item.id !== id) return item;
          const product = products.find(candidate => candidate.id === id);
          return { ...item, quantity: Math.min(product?.stock ?? item.quantity, item.quantity + delta) };
        })
        .filter(item => item.quantity > 0)
    );
  };

  const toggleWishlist = id => {
    setWishlist(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
  };

  const submitCheckout = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      address: String(form.get('address') || '').trim(),
      city: String(form.get('city') || '').trim(),
      postcode: String(form.get('postcode') || '').trim(),
    };

    if (!customer.name || !customer.email || !customer.address || !customer.city || !customer.postcode || !cart.length) {
      setCheckoutMessage('Please complete your order and add an item to cart.');
      return;
    }

    setIsSubmittingOrder(true);
    setCheckoutMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your order could not be placed.');

      setCheckoutMessage(`${result.message} Order ${result.orderId}, total ${currency(result.total)}.`);
      setCart([]);

      fetch('/api/products')
        .then(productsResponse => productsResponse.ok ? productsResponse.json() : null)
        .then(items => {
          if (!Array.isArray(items)) return;
          setProducts(items);
          setSelectedProduct(current => items.find(item => item.id === current.id) || items[0]);
        })
        .catch(error => console.error(error));

      window.setTimeout(() => {
        setCheckoutOpen(false);
        setCheckoutMessage('');
      }, 2200);
    } catch (error) {
      setCheckoutMessage(error.message || 'The server could not complete your order.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <span>Free shipping on orders above PKR 10,000</span>
        <span>7-day returns</span>
        <span>Secure checkout</span>
      </div>

      <header className="site-header">
        <button type="button" className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={18} />
        </button>

        <div className="brand-wrap">
          <div className="brand-mark">
            <span>nova</span>
            <strong>cart</strong>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-actions">
          <label className="search-trigger" aria-label="Search products">
            <Search size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search items"
            />
            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map(item => (
                  <li key={item} onClick={() => setSearchTerm(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </label>

          <button type="button" className="icon-button">
            <User size={16} />
            <span>Account</span>
          </button>

          <button type="button" className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={16} />
            <span>Bag</span>
            <strong>{cartCount}</strong>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-panel">
          <button type="button" className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
      )}

      <main className="page-shell">
        <section className="hero-section">
          <div className="hero-slider">
            {heroSlides.map((slide, index) => (
              <div key={slide.title} className={`hero-slide ${index === heroIndex ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <p className="eyebrow">{slide.accent}</p>
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <button type="button" className="primary-button">
                    {slide.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-dots" aria-label="Hero slider pagination">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === heroIndex ? 'active' : ''}
                onClick={() => setHeroIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="featured-categories" id="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured categories</p>
              <h2>Shop by lifestyle</h2>
            </div>
            <a href="#shop" className="text-link">
              Explore all <ChevronRight size={14} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map(category => (
              <button
                type="button"
                key={category.name}
                className="category-card"
                onClick={() => setActiveCategory(category.name)}
              >
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trending picks</p>
              <h2>Fresh finds for everyday confidence</h2>
            </div>
            <div className="filter-row">
              {['All', 'Men', 'Women', 'Electronics', 'Sale'].map(filter => (
                <button
                  key={filter}
                  type="button"
                  className={activeCategory === filter ? 'filter active' : 'filter'}
                  onClick={() => setActiveCategory(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => {
              const saved = wishlist.includes(product.id);
              const inStock = product.stock > 0;

              return (
                <article key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span className="badge">{product.badge}</span>}
                    <button
                      type="button"
                      className={saved ? 'wishlist active' : 'wishlist'}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="product-body">
                    <div className="product-meta-row">
                      <span>{product.category}</span>
                      <span>{product.rating} <Star size={12} /></span>
                    </div>

                    <h3>{product.name}</h3>

                    <div className="price-row">
                      <strong>{currency(product.price)}</strong>
                      <span>{currency(product.originalPrice)}</span>
                    </div>

                    <p className="stock-status">
                      <span className={inStock ? 'dot available' : 'dot'} />
                      {inStock ? (product.stock <= 5 ? `Only ${product.stock} left` : 'In stock') : 'Out of stock'}
                    </p>

                    <div className="product-actions">
                      <button type="button" className="secondary-button" onClick={() => setSelectedProduct(product)}>
                        View details
                      </button>
                      <button type="button" className="primary-button" onClick={() => addToCart(product, 1)} disabled={!inStock}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="product-showcase">
          <div className="showcase-media">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>

          <div className="showcase-details">
            <p className="eyebrow">Product page</p>
            <h2>{selectedProduct.name}</h2>

            <div className="rating-line">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={14} fill={index < Math.round(selectedProduct.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span>
                {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
              </span>
            </div>

            <div className="price-box">
              <strong>{currency(selectedProduct.price)}</strong>
              <span>{currency(selectedProduct.originalPrice)}</span>
              <em>Save {currency(selectedProduct.originalPrice - selectedProduct.price)}</em>
            </div>

            <p className="showcase-description">{selectedProduct.description}</p>

            <div className="option-group">
              <div>
                <label>Color</label>
                <div className="toggle-row">
                  {selectedProduct.colors.map(color => (
                    <button key={color} type="button" className="chip-button">
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label>Size</label>
                <div className="toggle-row">
                  {selectedProduct.sizes.map(size => (
                    <button key={size} type="button" className="chip-button">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="stock-box">
              <span className={selectedProduct.stock > 0 ? 'dot available' : 'dot'} />
              {selectedProduct.stock > 0 ? 'In Stock' : 'Sold out'}
            </div>

            <div className="cta-row">
              <button type="button" className="primary-button" onClick={() => addToCart(selectedProduct)} disabled={selectedProduct.stock < 1}>
                Add to cart
              </button>
              <button type="button" className="secondary-button" onClick={() => toggleWishlist(selectedProduct.id)}>
                {wishlist.includes(selectedProduct.id) ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <ul className="product-features">
              {selectedProduct.features.map(feature => (
                <li key={feature}><Check size={14} /> {feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="trust-section" id="reviews">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trust & social proof</p>
              <h2>Why customers keep coming back</h2>
            </div>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <ShieldCheck size={20} />
              <h3>100% Original</h3>
              <p>Authentic products backed by trusted sellers and verified quality checks.</p>
            </div>
            <div className="trust-card">
              <Truck size={20} />
              <h3>Fast Delivery</h3>
              <p>Quick dispatch and tracking updates so customers know exactly where their order is.</p>
            </div>
            <div className="trust-card">
              <CreditCard size={20} />
              <h3>Secure Payments</h3>
              <p>Protected checkout and flexible payment methods for stress-free shopping.</p>
            </div>
            <div className="trust-card">
              <Tag size={20} />
              <h3>Easy Returns</h3>
              <p>Hassle-free return support within the policy window for peace of mind.</p>
            </div>
          </div>

          <div className="review-grid">
            {reviews.map(review => (
              <article key={review.name} className="review-card">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={14} fill={index < review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <h3>{review.title}</h3>
                <p>“{review.text}”</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Customer support</p>
              <h2>Frequently asked questions</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={faq.question} className={faqIndex === index ? 'faq-item active' : 'faq-item'}>
                <button type="button" onClick={() => setFaqIndex(faqIndex === index ? -1 : index)}>
                  <span>{faq.question}</span>
                  <ChevronRight size={16} />
                </button>
                {faqIndex === index && <p>{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="support-section">
          <div className="support-card">
            <div>
              <p className="eyebrow">Need help?</p>
              <h2>Talk to us instantly</h2>
            </div>

            <div className="support-links">
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </section>
      </main>

      <aside className={cartOpen ? 'cart-drawer open' : 'cart-drawer'}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Your bag</p>
            <h3>Shopping cart</h3>
          </div>
          <button type="button" className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{currency(item.price)}</p>
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateCartQuantity(item.id, -1)}>
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateCartQuantity(item.id, 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>{currency(subtotal)}</strong>
              </div>
              <button type="button" className="primary-button" onClick={() => setCheckoutOpen(true)}>
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </aside>

      {checkoutOpen && (
        <div className="checkout-modal">
          <div className="checkout-box">
            <button type="button" className="close-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">
              <X size={18} />
            </button>

            <p className="eyebrow">Almost done</p>
            <h2>One-page checkout</h2>

            <form onSubmit={submitCheckout}>
              <input name="name" type="text" placeholder="Full name" required />
              <input name="email" type="email" placeholder="Email address" required />
              <input name="address" type="text" placeholder="Shipping address" required />
              <div className="form-grid">
                <input name="city" type="text" placeholder="City" required />
                <input name="postcode" type="text" placeholder="Postal code" required />
              </div>
              <button type="submit" className="primary-button" disabled={isSubmittingOrder}>
                {isSubmittingOrder ? 'Placing order...' : 'Place order'}
              </button>
              {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
            </form>
          </div>
        </div>
      )}

      <div className="floating-support">
        <button type="button" onClick={() => setChatOpen(value => !value)} aria-label="Open live chat">
          <MessageCircle size={18} />
        </button>

        {chatOpen && (
          <div className="chat-box">
            <div className="chat-header">
              <span>Live chat</span>
              <button type="button" className="close-button" onClick={() => setChatOpen(false)} aria-label="Close chat">
                <X size={14} />
              </button>
            </div>
            <p>Hi! Need help choosing a product?</p>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
