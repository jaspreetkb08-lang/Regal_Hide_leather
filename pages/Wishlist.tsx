
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface WishlistProps {
  items: Product[];
  onAddToCart: (product: Product) => void;
  onRemove: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ items, onAddToCart, onRemove, onProductClick }) => {
  return (
    <div className="pt-48 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display text-palace-charcoal mb-4">The Collection of Desires</h1>
        <p className="text-palace-gold uppercase tracking-[0.4em] text-[10px] font-bold">Your marked treasures</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-palace-border rounded-xl bg-white">
          <p className="font-serif italic text-2xl text-palace-charcoal/40 mb-10">Your collection is empty, Majesty.</p>
          <button 
            className="btn-minimal-gold px-12 py-5 text-[10px] uppercase tracking-widest font-bold"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'shop' }))}
          >
            Explore the Vault
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {items.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onAddToWishlist={onRemove}
              onClick={onProductClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
