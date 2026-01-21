
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-gold-500 uppercase tracking-[0.5em] text-xs font-bold mb-4">The Grace of an Empress</p>
          <h1 className="text-5xl md:text-7xl font-serif text-royal-900 dark:text-ivory mb-6">Her Legacy</h1>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif text-royal-900 dark:text-ivory mb-6 italic">Inspiration from the Zenana</h2>
            <p className="text-leather-light dark:text-ivory/70 leading-relaxed mb-6 font-light">
              Regal Hide was born in the shadows of the royal palaces, inspired by the quiet strength and unparalleled elegance of the Maharanis of India. They were the true custodians of taste, blending the ruggedness of the land with the softness of silk.
            </p>
            <p className="text-leather-light dark:text-ivory/70 leading-relaxed font-light">
              Our sourcing remains a closely guarded secret, much like the royal recipes of old. We select hides that possess a 'Noor'—a natural glow—that only deepens as it ages in your company.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 border border-gold-500/20 rounded-3xl translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1598891001556-37b2520da94c?auto=format&fit=crop&q=80&w=1200" 
              alt="Royal Courtyard Inspiration" 
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover brightness-75"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold-500/20 rounded-3xl -translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1617540209689-54b025f190a6?auto=format&fit=crop&q=80&w=1200" 
              alt="Intricate Handiwork" 
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-royal-900 dark:text-ivory mb-6 italic">The Artist's Decree</h2>
            <p className="text-leather-light dark:text-ivory/70 leading-relaxed mb-6 font-light">
              Every fold and stitch is a tribute to the 'Shringar' (beauty) of a queen. Our karigars use tools that haven't changed in generations, carving delicate patterns that mirror the jali work of Hawa Mahal or the mosaics of Mysore.
            </p>
            <p className="text-leather-light dark:text-ivory/70 leading-relaxed font-light">
              We do not just make products; we create heirlooms. Pieces that are passed from mother to daughter, carrying the scent of heritage and the touch of a sovereign.
            </p>
          </div>
        </div>

        <div className="bg-royal-900 rounded-[3rem] p-12 md:p-20 text-center border border-gold-500/20 relative overflow-hidden">
          <div className="absolute inset-0 jali-pattern opacity-10" />
          <h2 className="text-4xl font-serif text-gold-500 mb-8 relative z-10">The Royal Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-ivory/80 relative z-10">
            <div>
              <div className="text-gold-500 text-5xl mb-4 font-serif">130+</div>
              <p className="uppercase tracking-widest text-xs font-bold">Years of Purity</p>
            </div>
            <div>
              <div className="text-gold-500 text-5xl mb-4 font-serif">100%</div>
              <p className="uppercase tracking-widest text-xs font-bold">Shahi Karigari</p>
            </div>
            <div>
              <div className="text-gold-500 text-5xl mb-4 font-serif">Sovereign</div>
              <p className="uppercase tracking-widest text-xs font-bold">Heirloom Quality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
