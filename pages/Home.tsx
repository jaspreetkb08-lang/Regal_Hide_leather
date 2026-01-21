
import { ArrowRight, Crown } from 'lucide-react';
import React from 'react';
import { Collection, Product } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onSwitchCollection: (collection: Collection) => void;
}

const Home: React.FC<HomeProps> = ({ onSwitchCollection, onNavigate }) => {
  return (
    <div className="animate-royal-up">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center bg-white border-b border-palace-border">
        <div className="absolute inset-0 opacity-5">
           <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <Crown size={32} className="mx-auto text-palace-gold mb-8" />
          <h1 className="text-6xl md:text-8xl font-display text-palace-charcoal mb-8 leading-tight tracking-tight">Sovereignty <br /><span className="font-serif italic text-palace-gold">by decree.</span></h1>
          <p className="text-xl md:text-2xl font-serif text-palace-charcoal/40 italic mb-12">Pure minimalist leather artifacts, handcrafted for the modern heir.</p>
          <button 
            onClick={() => onNavigate('shop')}
            className="btn-minimal-gold px-16 py-6 text-[11px] uppercase tracking-[0.5em] font-bold"
          >
            Explore the Vaults
          </button>
        </div>
      </section>

      {/* Portals */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div 
          onClick={() => onSwitchCollection('Maharani')}
          className="group relative h-[80vh] cursor-pointer overflow-hidden border-r border-palace-border"
        >
          <img src="https://i.pinimg.com/736x/37/ae/a7/37aea7ff1ee639a134b13fd9839b5183.jpg" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="Her Vault" />
          <div className="absolute inset-0 bg-white/50 group-hover:bg-white/10 transition-all duration-700" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <span className="text-[12px] uppercase tracking-[0.6em] text-palace-charcoal font-black mb-6 drop-shadow-sm">Collection One</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-palace-gold mb-12 tracking-tight drop-shadow-md">The Maharani</h2>
            <div className="btn-minimal-gold px-10 py-4 text-[10px] uppercase tracking-widest font-bold bg-white/95 backdrop-blur-md group-hover:bg-palace-gold group-hover:text-white transition-all shadow-xl">Enter Vault <ArrowRight size={14} className="inline ml-2" /></div>
          </div>
        </div>

        <div 
          // Fixed typo: Changed 'Mahaja' to 'Maharaja' to correctly match the Collection type.
          onClick={() => onSwitchCollection('Maharaja')}
          className="group relative h-[80vh] cursor-pointer overflow-hidden"
        >
          <img src="https://i.pinimg.com/736x/92/6a/b4/926ab454b8f5fe45bc533de507a41ba8.jpg" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="His Vault" />
          <div className="absolute inset-0 bg-white/50 group-hover:bg-white/10 transition-all duration-700" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <span className="text-[12px] uppercase tracking-[0.6em] text-palace-charcoal font-black mb-6 drop-shadow-sm">Collection Two</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-palace-gold mb-12 tracking-tight drop-shadow-md">The Maharaja</h2>
            <div className="btn-minimal-gold px-10 py-4 text-[10px] uppercase tracking-widest font-bold bg-white/95 backdrop-blur-md group-hover:bg-palace-gold group-hover:text-white transition-all shadow-xl">Enter Vault <ArrowRight size={14} className="inline ml-2" /></div>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="py-40 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-serif italic text-palace-charcoal/80 mb-12">"Artistry is the silent language of the sovereign."</h2>
        <div className="h-20 w-[1px] bg-palace-gold mx-auto mb-12" />
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-palace-gold">Regal Hide Imperial Standard</p>
      </section>
    </div>
  );
};

export default Home;
