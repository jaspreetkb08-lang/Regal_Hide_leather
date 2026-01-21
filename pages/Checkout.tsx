
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Truck, Lock, Smartphone } from 'lucide-react';

interface CheckoutProps {
  total: number;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ total, onComplete }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Forms */}
        <div className="flex-1 space-y-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold-500/20 -translate-y-1/2 -z-10" />
            {[
              { n: 1, label: 'Identity' },
              { n: 2, label: 'Dispatch' },
              { n: 3, label: 'Payment' }
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  step >= s.n ? 'bg-gold-500 border-gold-500 text-royal-900 shadow-lg scale-110' : 'bg-white dark:bg-royal-900 border-gold-500/30 text-gold-500'
                }`}>
                  {s.n}
                </div>
                <span className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${
                  step >= s.n ? 'text-gold-500' : 'text-leather-light/40'
                }`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-royal-900 p-10 rounded-3xl border border-gold-500/10 shadow-xl">
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-serif text-royal-900 dark:text-ivory mb-8">Personal Credentials</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-1 flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">First Name</label>
                    <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="Rajesh" />
                  </div>
                  <div className="col-span-1 flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Last Name</label>
                    <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="Singh" />
                  </div>
                  <div className="col-span-2 flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Secure Email</label>
                    <input type="email" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="r.singh@heritage.in" />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-10 bg-royal-900 dark:bg-royal-700 text-gold-500 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-xl transition-all"
                >
                  Continue to Dispatch
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-serif text-royal-900 dark:text-ivory mb-8">Delivery Estate</h3>
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Address Line</label>
                    <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="42, Malabar Hill" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">City</label>
                      <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="Mumbai" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Pincode</label>
                      <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 text-sm focus:ring-1 ring-gold-500" placeholder="400006" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gold-500/50 text-gold-500 py-4 rounded-full font-bold uppercase tracking-widest text-sm">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-royal-900 dark:bg-royal-700 text-gold-500 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">Proceed to Payment</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-serif text-royal-900 dark:text-ivory mb-8">Vault Transaction</h3>
                <div className="space-y-4 mb-8">
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 bg-ivory dark:bg-royal-800 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-gold-500 ring-1 ring-gold-500' : 'border-gold-500/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="text-gold-500" />
                      <span className="text-sm dark:text-ivory font-bold uppercase tracking-widest">Credit / Debit Card</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'card' ? 'border-gold-500 bg-gold-500' : 'border-gold-500/30'}`}></div>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-6 bg-ivory dark:bg-royal-800 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-gold-500 ring-1 ring-gold-500' : 'border-gold-500/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Smartphone className="text-gold-500" />
                      <span className="text-sm dark:text-ivory font-bold uppercase tracking-widest">UPI / Net Banking</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'upi' ? 'border-gold-500 bg-gold-500' : 'border-gold-500/30'}`}></div>
                  </div>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Card Details</label>
                      <div className="relative">
                        <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 w-full text-sm focus:ring-1 ring-gold-500 pl-12" placeholder="XXXX XXXX XXXX 8821" />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/40" size={16} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">UPI ID</label>
                      <input type="text" className="bg-ivory dark:bg-royal-800 border-none rounded-xl p-4 w-full text-sm focus:ring-1 ring-gold-500" placeholder="rajesh@okaxis" />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-10">
                  <button onClick={() => setStep(2)} className="flex-1 border border-gold-500/50 text-gold-500 py-4 rounded-full font-bold uppercase tracking-widest text-sm">Back</button>
                  <button onClick={onComplete} className="flex-[2] bg-gold-500 text-royal-900 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-gold-400">Complete Acquisition</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-royal-900 p-8 rounded-3xl border border-gold-500/20 shadow-2xl sticky top-32">
            <h4 className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-8 flex items-center">
              <ShieldCheck className="mr-2" size={16} /> Secure Ledger
            </h4>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-ivory/60 text-sm">
                <span>Merchandise Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-ivory/60 text-sm">
                <span>Imperial Priority Delivery</span>
                <span className="text-gold-500 uppercase tracking-widest font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-ivory/60 text-sm">
                <span>Authenticity Insurance</span>
                <span>₹0.00</span>
              </div>
              <div className="pt-4 border-t border-gold-500/10 flex justify-between">
                <span className="text-ivory uppercase tracking-widest font-bold">Grand Total</span>
                <span className="text-2xl font-serif text-gold-500">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="space-y-4 text-[10px] text-ivory/40 uppercase tracking-[0.15em] text-center italic">
              <p>Hand-crafted in Udaipur. Insured for life.</p>
              <div className="flex justify-center space-x-2">
                <Truck size={14} className="text-gold-500/40" />
                <span>Express Courier Pan-India Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
