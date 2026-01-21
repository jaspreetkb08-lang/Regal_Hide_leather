import React, { useState } from 'react';
import { Camera, Package, MapPin, CreditCard, Settings, LogOut, Plus, ShieldCheck, Truck, Home as HomeIcon, Box } from 'lucide-react';
import { Order, Address } from '../types';

interface ProfileProps {
  orders: Order[];
  addresses: Address[];
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ orders, addresses, onNavigate }) => {
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [activeTab, setActiveTab] = useState<'history' | 'estates' | 'payment' | 'decrees'>('history');

  const handleAvatarChange = () => {
    alert("Portrait update requested from the Imperial Ledger.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <div className="animate-royal-up space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-palace-border/60 shadow-sm">
              <h2 className="text-2xl font-serif text-palace-charcoal mb-8 italic">Acquisition History</h2>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="p-8 border border-palace-border/40 rounded-2xl bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <img 
                          src={order.items?.[0]?.image} 
                          className="w-16 h-16 object-cover rounded-xl bg-palace-ivory border border-palace-border" 
                          alt="" 
                        />
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-palace-charcoal/40">{order.id}</p>
                          <h4 className="text-xl font-serif text-palace-charcoal italic">{order.items?.[0]?.name}</h4>
                          <p className="text-[11px] font-sans text-palace-charcoal/40">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-palace-charcoal">₹{order.total.toLocaleString('en-IN')}</p>
                        <p className={`text-[9px] uppercase font-black tracking-widest mt-1 ${order.status === 'Delivered' ? 'text-green-600' : 'text-palace-gold'}`}>
                          {order.status === 'Shipped' ? 'IN TRANSIT' : order.status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar Tracking */}
                    <div className="mt-8">
                      <div className="h-[2px] w-full bg-palace-border relative rounded-full">
                        <div 
                          className={`h-full bg-palace-gold transition-all duration-1000 rounded-full ${
                            order.status === 'Processing' ? 'w-1/4' : 
                            order.status === 'Shipped' ? 'w-1/2' : 
                            order.status === 'In Transit' ? 'w-3/4' : 'w-full'
                          }`}
                        />
                      </div>
                      <div className="flex justify-between mt-3">
                        <span className="text-[8px] uppercase tracking-widest font-bold text-palace-charcoal/30">Order Placed</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold text-palace-charcoal/30">Dispatched</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold text-palace-charcoal/30">Arrived</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'estates':
        return (
          <div className="animate-royal-up space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-palace-border/60 shadow-sm">
              <h2 className="text-2xl font-serif text-palace-charcoal mb-8 italic">Delivery Estates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {addresses.map(addr => (
                  <div key={addr.id} className="p-8 border border-palace-border/40 rounded-2xl bg-white relative">
                    <span className="absolute top-6 right-8 text-[9px] uppercase font-black tracking-[0.2em] text-palace-charcoal/30">Primary Palace</span>
                    <p className="text-palace-charcoal font-display text-base mb-4">{addr.type} Estate</p>
                    <div className="text-sm font-serif italic text-palace-charcoal/60 leading-relaxed">
                      <p>{addr.line1},</p>
                      <p>{addr.city}, {addr.pincode},</p>
                      <p>Bharat</p>
                    </div>
                  </div>
                ))}
                <div className="p-8 border-2 border-dashed border-palace-border/40 rounded-2xl flex flex-col items-center justify-center text-palace-charcoal/20 hover:text-palace-gold hover:border-palace-gold/40 transition-all cursor-pointer bg-palace-ivory/20 group">
                  <Plus size={20} className="mb-2 group-hover:scale-110 transition-transform" />
                  <p className="uppercase tracking-[0.2em] text-[9px] font-black">+ Add New Estate</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="animate-royal-up space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-palace-border/60 shadow-sm">
              <h2 className="text-2xl font-serif text-palace-charcoal mb-8 italic">Payment Vault</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-palace-charcoal rounded-2xl text-white relative shadow-lg overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><CreditCard size={120} /></div>
                  <p className="text-[10px] uppercase tracking-[0.4em] mb-12 text-palace-gold font-black">Imperial Card</p>
                  <p className="text-xl tracking-[0.3em] font-sans mb-8">XXXX XXXX XXXX 8821</p>
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Rajesh Singh</p>
                    <p className="text-[10px] font-sans opacity-40">12 / 28</p>
                  </div>
                </div>
                <div className="p-8 border-2 border-dashed border-palace-border/40 rounded-2xl flex flex-col items-center justify-center text-palace-charcoal/20 hover:text-palace-gold hover:border-palace-gold/40 transition-all cursor-pointer bg-palace-ivory/20 group">
                  <Plus size={20} className="mb-2 group-hover:scale-110 transition-transform" />
                  <p className="uppercase tracking-[0.2em] text-[9px] font-black">Link New Method</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'decrees':
        return (
          <div className="animate-royal-up space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-palace-border/60 shadow-sm">
              <h2 className="text-2xl font-serif text-palace-charcoal mb-8 italic">Decrees & Settings</h2>
              <div className="divide-y divide-palace-border/30">
                {[
                  { title: 'Imperial Notifications', desc: 'Receive word of new vault openings.' },
                  { title: 'Secure Ledger', desc: 'Manage your biometric authentication.' },
                  { title: 'Heritage Sourcing', desc: 'Personalize your leather preferences.' },
                ].map((item, i) => (
                  <div key={i} className="py-6 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-serif text-palace-charcoal italic">{item.title}</h4>
                      <p className="text-xs text-palace-charcoal/40 mt-1">{item.desc}</p>
                    </div>
                    <div className="w-10 h-5 bg-palace-border/40 rounded-full p-1 cursor-pointer">
                      <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-48 pb-32 max-w-7xl mx-auto px-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Sidebar matching user screenshot exactly */}
        <div className="w-full lg:w-80 space-y-2 shrink-0">
          <div className="mb-12 pl-6">
            <h3 className="text-2xl font-serif text-palace-charcoal italic">Rajesh Singh</h3>
            <p className="text-[10px] uppercase tracking-[0.4em] text-palace-charcoal/30 font-bold">Imperial Member</p>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-palace-charcoal border border-palace-border/40' : 'text-palace-charcoal/40 hover:text-palace-charcoal'}`}
            >
              <Box size={18} className={activeTab === 'history' ? 'text-palace-gold' : ''} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Acquisition History</span>
            </button>

            <button 
              onClick={() => setActiveTab('estates')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'estates' ? 'bg-white shadow-sm text-palace-charcoal border border-palace-border/40' : 'text-palace-charcoal/40 hover:text-palace-charcoal'}`}
            >
              <MapPin size={18} className={activeTab === 'estates' ? 'text-palace-gold' : ''} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Imperial Estates</span>
            </button>

            <button 
              onClick={() => setActiveTab('payment')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'payment' ? 'bg-white shadow-sm text-palace-charcoal border border-palace-border/40' : 'text-palace-charcoal/40 hover:text-palace-charcoal'}`}
            >
              <CreditCard size={18} className={activeTab === 'payment' ? 'text-palace-gold' : ''} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Payment Vault</span>
            </button>

            <button 
              onClick={() => setActiveTab('decrees')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'decrees' ? 'bg-white shadow-sm text-palace-charcoal border border-palace-border/40' : 'text-palace-charcoal/40 hover:text-palace-charcoal'}`}
            >
              <Settings size={18} className={activeTab === 'decrees' ? 'text-palace-gold' : ''} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Decrees</span>
            </button>

            <div className="pt-8 space-y-1">
              <button 
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-palace-charcoal/40 hover:text-palace-gold transition-all"
              >
                <HomeIcon size={18} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">Go to Homepage</span>
              </button>

              <button 
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-red-400 hover:text-red-500 transition-all"
              >
                <LogOut size={18} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">Exit Vault</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full lg:max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;