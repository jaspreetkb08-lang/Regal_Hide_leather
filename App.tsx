import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Home from './pages/Home';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import { Product, CartItem, Category, Collection, Order, Address } from './types';
import { PRODUCTS } from './constants';
import { getStyleAdvice } from './services/geminiService';
import { X, CheckCircle, Info, Crown, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  // Global user state with dynamic tracking
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#RH-8102',
      date: 'Sep 28, 2024',
      total: 75000,
      status: 'In Transit',
      // Corrected to use PRODUCTS[14] (Rajput Brogues) which matches the 75k total
      items: [{ ...PRODUCTS[14], quantity: 1, selectedColor: 'Cognac' }]
    },
    {
      id: '#RH-7721',
      date: 'Aug 12, 2024',
      total: 115000,
      status: 'Delivered',
      items: [{ ...PRODUCTS[0], quantity: 1, selectedColor: 'Ruby Red' }]
    }
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      type: 'Home',
      line1: '42, Malabar Hill',
      city: 'Mumbai',
      pincode: '400006'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
  const [activeCollection, setActiveCollection] = useState<Collection>('Maharani');

  useEffect(() => {
    const handleNav = (e: any) => setActivePage(e.detail);
    window.addEventListener('navigate', handleNav);
    return () => window.removeEventListener('navigate', handleNav);
  }, []);

  const triggerToast = (message: string) => {
    setShowToast({ message, type: 'success' });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleCollectionSwitch = (collection: Collection) => {
    setActiveCollection(collection);
    setActivePage('shop');
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, silent = false) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor: product.colors[0] }];
    });
    if (!silent) triggerToast(`Vault item acquired.`);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, true);
    setSelectedProduct(null);
    setActivePage('checkout');
  };

  const addToWishlist = (product: Product) => {
    if (wishlist.find(p => p.id === product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
    } else {
      setWishlist(prev => [...prev, product]);
      triggerToast(`Marked for your future heritage.`);
    }
  };

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setAiAdvice(null);
    setLoadingAdvice(true);
    const advice = await getStyleAdvice(product.name);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  const placeOrder = (total: number) => {
    const newOrder: Order = {
      id: `#RH-${Math.floor(8000 + Math.random() * 1000)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: total,
      status: 'Processing',
      items: [...cart]
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setActivePage('profile');
    triggerToast('Order authorized, Majesty.');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            onNavigate={setActivePage} 
            onAddToCart={addToCart} 
            onAddToWishlist={addToWishlist}
            onProductClick={handleProductClick}
            onSwitchCollection={handleCollectionSwitch}
          />
        );
      case 'shop':
        const filtered = PRODUCTS.filter(p => 
          p.collection === activeCollection && 
          (filterCategory === 'All' || p.category === filterCategory)
        );
        return (
          <div className="pt-48 pb-24 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.5em] text-palace-gold font-bold mb-4 block">The Imperial Trousseau</span>
              <h1 className="text-5xl md:text-6xl font-display text-palace-charcoal mb-8">{activeCollection}'s Collection</h1>
              
              <div className="flex justify-center mb-12">
                <div className="inline-flex border border-palace-border rounded-full p-1 bg-white">
                  <button 
                    onClick={() => setActiveCollection('Maharani')}
                    className={`px-10 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeCollection === 'Maharani' ? 'bg-palace-charcoal text-white' : 'text-palace-charcoal/40'}`}
                  >
                    For Her
                  </button>
                  <button 
                    onClick={() => setActiveCollection('Maharaja')}
                    className={`px-10 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeCollection === 'Maharaja' ? 'bg-palace-charcoal text-white' : 'text-palace-charcoal/40'}`}
                  >
                    For Him
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-palace-border pb-8">
              <div className="flex flex-wrap justify-center gap-8">
                {['All', 'Watches', 'Bags', 'Shoes', 'Belts'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat as any)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 transition-all border-b-2 ${filterCategory === cat ? 'border-palace-gold text-palace-charcoal' : 'border-transparent text-palace-charcoal/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-palace-gold">
                {filtered.length} Treasures Found
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {filtered.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                  onAddToWishlist={addToWishlist}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        );
      case 'cart':
        const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        return (
          <div className="pt-48 pb-32 max-w-4xl mx-auto px-6 min-h-screen">
            <h1 className="text-4xl font-display text-palace-charcoal text-center mb-16">Imperial Vault</h1>
            {cart.length === 0 ? (
              <div className="text-center py-20 border border-palace-border rounded-xl bg-white">
                <p className="font-serif italic text-2xl text-palace-charcoal/40 mb-10">Your selection is empty, Majesty.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setActivePage('shop')}
                    className="btn-minimal-gold px-12 py-5 text-[10px] uppercase tracking-widest font-bold"
                  >
                    Explore the Vault
                  </button>
                  <button 
                    onClick={() => setActivePage('home')}
                    className="px-12 py-5 text-[10px] uppercase tracking-widest font-bold text-palace-charcoal/60 hover:text-palace-gold transition-all"
                  >
                    Return to Throne
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-8 bg-white p-8 border border-palace-border rounded-xl">
                    <img src={item.image} className="w-24 h-24 object-cover rounded-lg" alt={item.name} />
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl text-palace-charcoal">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-palace-gold font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-6">
                       <button onClick={() => setCart(prev => prev.filter(p => p.id !== item.id))} className="text-palace-charcoal/30 hover:text-red-500"><X size={20} /></button>
                    </div>
                  </div>
                ))}
                <div className="mt-12 p-10 border border-palace-border bg-white rounded-xl text-center">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-palace-charcoal/40">Grand Total</span>
                    <span className="text-4xl font-display text-palace-gold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button 
                    onClick={() => setActivePage('checkout')}
                    className="w-full bg-palace-charcoal text-white py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-palace-gold transition-all mb-4"
                  >
                    Secure Acquisition
                  </button>
                  <button 
                    onClick={() => setActivePage('home')}
                    className="text-[9px] uppercase tracking-widest font-bold text-palace-charcoal/30 hover:text-palace-gold"
                  >
                    Continue Journey Home
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'wishlist':
        return <Wishlist items={wishlist} onAddToCart={addToCart} onRemove={addToWishlist} onProductClick={handleProductClick} />;
      case 'about':
        return <About />;
      case 'profile':
        return <Profile orders={orders} addresses={addresses} onNavigate={setActivePage} />;
      case 'checkout':
        return <Checkout total={cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)} onComplete={() => placeOrder(cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0))} />;
      default:
        return <Home onNavigate={setActivePage} onAddToCart={addToCart} onAddToWishlist={addToWishlist} onProductClick={handleProductClick} onSwitchCollection={handleCollectionSwitch} />;
    }
  };

  return (
    <div className="min-h-screen bg-palace-ivory">
      <Navbar 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} 
        wishlistCount={wishlist.length}
        onNavigate={setActivePage}
        activePage={activePage}
      />
      
      <main>{renderPage()}</main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-palace-charcoal/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-50 text-palace-charcoal/30 hover:text-palace-charcoal"><X size={24} /></button>
            <div className="md:w-1/2 h-[400px] md:h-auto"><img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} /></div>
            <div className="md:w-1/2 p-12 overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-palace-gold font-bold">Ref: {selectedProduct.collection}</span>
                <span className="text-xl font-serif text-palace-gold font-bold">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
              </div>
              <h2 className="text-4xl font-display text-palace-charcoal mb-8">{selectedProduct.name}</h2>
              <p className="text-palace-charcoal/60 leading-relaxed font-serif text-xl mb-10 italic">"{selectedProduct.description}"</p>
              
              <div className="bg-palace-ivory p-6 rounded-xl border border-palace-border mb-10">
                <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest font-bold text-palace-gold">
                  <Info size={14} /> Concierge Advice
                </div>
                {loadingAdvice ? <div className="animate-pulse h-4 bg-palace-border w-full rounded"></div> : <p className="text-sm font-serif italic">{aiAdvice}</p>}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => handleBuyNow(selectedProduct)} className="flex-1 bg-palace-gold text-white py-5 text-[10px] uppercase tracking-widest font-bold hover:bg-palace-gold/90 transition-all shadow-lg">Buy Now</button>
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="flex-1 bg-palace-charcoal text-white py-5 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all">Acquire Now</button>
                </div>
                <button onClick={() => addToWishlist(selectedProduct)} className="w-full btn-minimal-gold py-5 text-[10px] uppercase tracking-widest font-bold">Mark Desire</button>
                
                {/* Added 'Go to Home Page' option */}
                <button 
                  onClick={() => { setSelectedProduct(null); setActivePage('home'); }} 
                  className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-palace-charcoal/30 hover:text-palace-gold transition-all"
                >
                  <ArrowLeft size={14} /> Return to Home Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-10 right-10 z-[200] bg-palace-charcoal text-white px-8 py-5 rounded-full shadow-2xl flex items-center gap-4 animate-royal-up">
          <CheckCircle size={18} className="text-palace-gold" />
          <span className="text-[10px] uppercase tracking-widest font-bold">{showToast.message}</span>
        </div>
      )}

      <footer className="bg-white border-t border-palace-border py-24 text-center">
        <span className="text-3xl font-display text-palace-charcoal tracking-[0.4em] block mb-8">REGAL HIDE</span>
        <p className="text-palace-charcoal/40 text-[10px] uppercase tracking-[0.5em]">Heritage • Sovereignty • Minimalism</p>
        <div className="h-20 w-[1px] bg-palace-gold/30 mx-auto my-12" />
        <p className="text-[10px] text-palace-charcoal/20 uppercase tracking-widest">© 2024 REGAL HIDE IMPERIAL HOUSE</p>
      </footer>
    </div>
  );
};

export default App;