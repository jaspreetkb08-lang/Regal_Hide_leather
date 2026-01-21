import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist, onClick }) => {
  return (
    <div className="royal-card group relative flex flex-col p-4 rounded-xl">
      <div 
        className="relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer bg-palace-ivory"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
        />
        <div className="absolute bottom-6 right-6 flex flex-col gap-3 translate-y-20 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
           <button 
             onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}
             className="p-4 bg-white/90 backdrop-blur-sm border border-palace-border rounded-full hover:bg-palace-gold hover:text-white transition-all shadow-xl"
           >
             <Heart size={16} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="p-4 bg-palace-charcoal text-white rounded-full hover:bg-palace-gold transition-all shadow-xl"
           >
             <Plus size={16} />
           </button>
        </div>
      </div>

      <div className="pt-8 pb-4 text-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-palace-charcoal/30 font-bold mb-3 block">{product.category}</span>
        <h3 className="text-2xl font-serif text-palace-charcoal mb-3 italic">{product.name}</h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-palace-gold">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

export default ProductCard;