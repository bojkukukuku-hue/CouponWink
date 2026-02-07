
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import LazySection from '../../components/LazySection';
import CouponModal from '../../components/CouponModal';
import { MockDB } from '../../services/mockDb';
import { useEffect, useState } from "react";
import { listActiveCouponsPublic } from "../../services/supabaseApi";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const data = await listActiveCouponsPublic();
      setCoupons(data);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  useEffect(() => {
    setStores(MockDB.getStores().filter((s: any) => s.status === 'Active'));
    setCategories(MockDB.getCategories());
    setCoupons(MockDB.getCoupons().filter((c: any) => c.status === 'Active'));
    
    const settings = MockDB.getSettings();
    if (settings?.metaTitle) document.title = settings.metaTitle;
  }, []);

  const handleShowCode = (deal: any) => {
    const store = stores.find(s => s.id === deal.storeId);
    
    if (deal.code) {
      try {
        navigator.clipboard.writeText(deal.code);
      } catch (e) {}
    }

    const partnerLink = deal.link || store?.website || '#';
    window.open(partnerLink, '_blank');
    
    setSelectedCoupon({
      storeName: store?.name || deal.storeName || deal.storeId,
      title: deal.title,
      code: deal.code,
      discountValue: deal.label,
      link: partnerLink
    });
  };

  const faqs = [
    { q: "Are all the promo codes verified?", a: "Yes, our team manually verifies every promo code daily to ensure they are active and working." },
    { q: "Is CouponWink free to use?", a: "Absolutely! CouponWink is 100% free for all users to find and use the best deals." },
    { q: "How often are new codes added?", a: "We update our database 24/7 as soon as new offers become available from our partners." },
    { q: "What if a code doesn't work?", a: "While we strive for 100% accuracy, sometimes deals expire early. You can report a broken code and we will investigate immediately." }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-white dark:bg-slate-950 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-500/5 to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-800">
            <span className="material-icons-round text-sm">verified</span> All codes verified daily
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight font-display leading-[1.1]">
            Verified Promo Codes for <br/>
            <span className="text-primary-500">AI Tools & Hosting</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Save money on the best AI tools, hosting services, and SaaS products. Trusted by 100,000+ developers, marketers, and founders.
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${searchQuery}`); }} className="relative max-w-2xl mx-auto mb-10">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-300">search</span>
            </div>
            <input 
              className="w-full pl-14 pr-32 py-5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary-500/10 outline-none transition shadow-sm" 
              placeholder="Search for stores, categories, or deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary-500 hover:bg-primary-600 text-white px-8 rounded-full font-bold transition">
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><span className="material-icons-round text-primary-500 text-sm">check_circle</span> Verified codes</div>
            <div className="flex items-center gap-2"><span className="material-icons-round text-primary-500 text-sm">update</span> Updated daily</div>
            <div className="flex items-center gap-2"><span className="material-icons-round text-primary-500 text-sm">person</span> 100% free to use</div>
          </div>
        </div>
      </section>

      {/* Trending Stores */}
      <LazySection className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Trending Stores</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Most popular deals this week</p>
            </div>
            <Link to="/search" className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900">
              View All <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.slice(0, 6).map((store) => (
              <Link key={store.id} to={`/store/${store.id}`} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <span className={`material-icons-round text-3xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-slate-900 dark:text-white">{store.name}</h3>
                      <div className="flex items-center text-amber-400 text-xs">
                        <span className="material-icons-round text-sm">star</span>
                        <span className="font-black ml-0.5">{store.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {store.description}
                    </p>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-3 flex items-center justify-between group-hover:border-primary-500 transition-all">
                  <span className="text-xs font-black flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <span className="material-icons-round text-base">local_offer</span>
                    Save at {store.name}
                  </span>
                  <span className="material-icons-round text-base text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Browse by Category - Moved Up */}
      <LazySection className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Browse by Category</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Find the best deals organized by product type and use case</p>
            </div>
            <Link to="/categories" className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900">
              View All <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((cat, i) => (
              <Link key={i} to={`/search?category=${encodeURIComponent(cat.name)}`} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-xl transition-all group">
                <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-primary-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <span className="material-icons-round text-2xl">{cat.icon || 'category'}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors font-display">{cat.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{cat.description}</p>
                <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                  <span>Explore Stores</span>
                  <span className="material-icons-round text-base">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Today's Best Deals - Now below Categories */}
      <LazySection className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 font-display">Today's Best Deals</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">Hand-picked offers expiring soon</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.slice(0, 3).map((deal, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex gap-2">
                     <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest">{deal.storeId}</span>
                     <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                       <span className="material-icons-round text-xs">verified</span> Verified
                     </span>
                   </div>
                   <div className="text-lg font-black text-primary-500">{deal.label}</div>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{deal.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-grow">{deal.desc}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShowCode(deal)}
                    className="flex-grow bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-black text-sm transition flex items-center justify-center gap-2"
                  >
                    <span className="material-icons-round text-lg">content_copy</span>
                    Show Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Statistics Section */}
      <section className="py-12 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-primary-500 font-display">500+</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stores</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-primary-500 font-display">2,000+</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Codes</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-primary-500 font-display">100K+</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Happy Users</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-primary-500 font-display">$5M+</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Money Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <LazySection className="py-24 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 font-display">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-16 font-medium">Start saving in three simple steps</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="size-16 rounded-2xl bg-primary-100/50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-icons-round text-3xl">search</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">1. Find Your Store</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
                  Search for your favorite AI tool, hosting service, or SaaS product.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="size-16 rounded-2xl bg-primary-100/50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-icons-round text-3xl">content_copy</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">2. Copy the Code</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
                  Click to reveal and automatically copy verified promo codes.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="size-16 rounded-2xl bg-primary-100/50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-icons-round text-3xl">savings</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">3. Save Money</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
                  Apply the code at checkout and enjoy instant savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/20">
                <span className="material-icons-round text-3xl text-white">mark_email_unread</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-display">Never Miss a Deal</h2>
              <p className="text-emerald-50 text-lg mb-12 font-medium opacity-90 leading-relaxed">
                Get the latest verified promo codes and exclusive deals delivered straight to your inbox. Join 50,000+ savvy shoppers today.
              </p>
              
              <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-6 py-4 rounded-xl text-slate-900 placeholder:text-slate-400 font-semibold outline-none border-none shadow-lg focus:ring-4 focus:ring-white/20 transition-all"
                  required
                />
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition shadow-lg active:scale-95">
                  Subscribe
                </button>
              </form>
              <p className="text-emerald-100/60 text-[10px] font-black mt-8 uppercase tracking-[0.2em]">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 font-display text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-slate-900 dark:text-white text-left"
                >
                  <span>{faq.q}</span>
                  <span className="material-icons-round text-slate-400 transition-transform duration-300" style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                </button>
                <div className={`px-6 transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CouponModal 
        isOpen={!!selectedCoupon} 
        onClose={() => setSelectedCoupon(null)} 
        coupon={selectedCoupon} 
      />
    </Layout>
  );
};

export default HomePage;
