
import React, { useState } from 'react';
import { ShoppingBag, User, Heart, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: string) => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  wishlistCount, 
  onNavigate,
  activePage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-palace-border py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        {/* Menu Toggle */}
        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-palace-charcoal"><Menu size={24} /></button>
        
        {/* Links (Left) */}
        <div className="hidden lg:flex items-center space-x-12">
          <button onClick={() => onNavigate('shop')} className={`text-[10px] uppercase tracking-[0.3em] font-bold ${activePage === 'shop' ? 'text-palace-gold' : 'text-palace-charcoal/40'} hover:text-palace-gold transition-all`}>The Vaults</button>
          <button onClick={() => onNavigate('about')} className={`text-[10px] uppercase tracking-[0.3em] font-bold ${activePage === 'about' ? 'text-palace-gold' : 'text-palace-charcoal/40'} hover:text-palace-gold transition-all`}>Legacy</button>
        </div>

        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center">
          <span className="text-3xl font-display text-palace-charcoal tracking-[0.4em] font-bold">REGAL HIDE</span>
        </button>

        {/* Icons */}
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('wishlist')} className="relative text-palace-charcoal/40 hover:text-palace-gold transition-all">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-palace-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
          </button>
          <button onClick={() => onNavigate('cart')} className="relative text-palace-charcoal/40 hover:text-palace-gold transition-all">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-palace-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
          <button onClick={() => onNavigate('profile')} className="text-palace-charcoal/40 hover:text-palace-gold transition-all"><User size={20} /></button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-palace-ivory z-[100] flex flex-col items-center justify-center animate-royal-up p-12">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-12 right-12"><X size={32} /></button>
          <div className="flex flex-col space-y-12 text-center">
            <button onClick={() => {onNavigate('home'); setIsMenuOpen(false)}} className="text-4xl font-display text-palace-charcoal">Throne (Home)</button>
            <button onClick={() => {onNavigate('shop'); setIsMenuOpen(false)}} className="text-4xl font-display text-palace-charcoal">The Vaults</button>
            <button onClick={() => {onNavigate('about'); setIsMenuOpen(false)}} className="text-4xl font-display text-palace-charcoal">Legacy</button>
            <button onClick={() => {onNavigate('profile'); setIsMenuOpen(false)}} className="text-4xl font-display text-palace-charcoal">Profile</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
