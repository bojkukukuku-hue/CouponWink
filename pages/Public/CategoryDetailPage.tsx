
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { MockDB } from '../../services/mockDb';
import CouponModal from '../../components/CouponModal';

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('All Offers');

  useEffect(() => {
    const cats = MockDB.getCategories();
    // Support finding by ID or URL-friendly name
    const foundCat = cats.find((c: any) => c.id === id || c.name.toLowerCase().replace(/\s+/g, '-') === id);
    if (foundCat) {
      setCategory(foundCat);
      const allStores = MockDB.getStores().filter(s => s.category === foundCat.name);
      setStores(allStores);
      
      const storeIds = allStores.map(s => s.id);
      const allCoupons = MockDB.getCoupons().filter(c => storeIds.includes(c.storeId) && c.status === 'Active');
      setCoupons(allCoupons);
    }
  }, [id]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter(c => {
      if (activeFilter === 'All Offers') return true;
      if (activeFilter === 'Free Trial') return c.title.toLowerCase().includes('trial') || c.label.toLowerCase().includes('free');
      if (activeFilter === '% Off') return c.label.includes('%');
      if (activeFilter === 'Student Discount') return c.title.toLowerCase().includes('student');
      return true;
    });
  }, [activeFilter, coupons]);

  if (!category) return <Layout><div className="p-20 text-center animate-pulse font-black text-slate-300">Loading Category...</div></Layout>;

  const handleReveal = (coupon: any) => {
    const store = stores.find(s => s.id === coupon.storeId);
    const partnerLink = coupon.link || store?.website || '#';
    if (coupon.code) { try { navigator.clipboard.writeText(coupon.code); } catch (e) {} }
    window.open(partnerLink, '_blank');
    setSelectedCoupon({ storeName: store?.name || coupon.storeId, title: coupon.title, code: coupon.code, discountValue: coupon.label, link: partnerLink });
  };

  return (
    <Layout>
      {/* Category Hero Section */}
      <header className="bg-emerald-50/20 dark:bg-slate-900/40 pt-20 pb-16 px-4 border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
           <div className="size-28 rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/5 border border-emerald-100 dark:border-emerald-800 transition-transform hover:scale-105 duration-300">
              <span className="material-icons-round text-6xl">{category.icon || 'category'}</span>
           </div>
           <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight mb-3">{category.name} Tools</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-3xl mb-8 leading-relaxed">
                Save on top-rated AI assistants, content generators, and copywriting software. Discover verified promo codes for your digital workspace.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="material-icons-round text-lg text-emerald-500">store</span> {stores.length} stores available</span>
                <span className="flex items-center gap-2"><span className="material-icons-round text-lg text-emerald-500">verified</span> All codes verified</span>
                <span className="flex items-center gap-2"><span className="material-icons-round text-lg text-emerald-500">update</span> Updated daily</span>
              </div>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Stores in this category */}
        <section className="mb-20">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 font-display">{stores.length} Stores in {category.name}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {stores.map(store => (
               <div key={store.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 flex items-center gap-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="size-24 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4 shrink-0 border border-slate-100 dark:border-slate-700">
                    <span className={`material-icons-round text-5xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-slate-900 dark:text-white text-lg truncate group-hover:text-emerald-500 transition-colors">{store.name}</h3>
                      <div className="flex items-center text-amber-400 text-xs shrink-0">
                        <span className="material-icons-round text-sm">star</span> {store.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4 font-medium">{store.description}</p>
                    <Link to={`/store/${store.id}`} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                      {coupons.filter(c => c.storeId === store.id).length} active codes <span className="material-icons-round text-sm">arrow_forward</span>
                    </Link>
                  </div>
               </div>
             ))}
           </div>
        </section>

        {/* All Deals Filter Section */}
        <section className="mb-24">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">All Deals & Promo Codes <span className="text-slate-400 font-bold ml-2">({filteredCoupons.length})</span></h2>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1 shadow-inner">
                {['All Offers', 'Free Trial', '% Off', 'Student Discount'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
           </div>

           {/* Deals List */}
           <div className="space-y-6">
              {filteredCoupons.map((coupon, i) => {
                const store = stores.find(s => s.id === coupon.storeId);
                return (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 flex flex-col md:flex-row gap-12 items-center group shadow-sm hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300">
                    <div className="shrink-0 flex flex-col items-center gap-3">
                       <div className="size-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                          <span className={`material-icons-round text-4xl ${store?.color || 'text-primary-500'}`}>{store?.logo || 'storefront'}</span>
                       </div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{store?.name}</span>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 flex items-center gap-1">
                            <span className="material-icons-round text-[10px]">verified</span> Verified
                          </span>
                          <span className="px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-widest border border-orange-100 dark:border-orange-800 flex items-center gap-1">
                            <span className="material-icons-round text-[10px]">trending_up</span> Popular
                          </span>
                       </div>
                       <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors leading-tight font-display">{coupon.title}</h3>
                       <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">{coupon.desc || 'Exclusive offer for our community. Limited time only.'}</p>
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><span className="material-icons-round text-sm opacity-60">schedule</span> Jan 15, 2025</span>
                          <span className="flex items-center gap-2"><span className="material-icons-round text-sm opacity-60">person</span> {coupon.usage?.toLocaleString() || '1,234'} used</span>
                       </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-center md:items-end min-w-[200px]">
                       <div className="text-3xl font-black text-emerald-500 mb-6">{coupon.label}</div>
                       <button 
                          onClick={() => handleReveal(coupon)}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-10 rounded-xl text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-500/10 active:scale-95 transition flex items-center justify-center gap-2"
                       >
                          <span className="material-icons-round text-lg">{coupon.code ? 'content_copy' : 'bolt'}</span>
                          {coupon.code ? 'Copy Code' : 'Get Deal'}
                       </button>
                    </div>
                  </div>
                );
              })}
           </div>

           <button className="w-full mt-10 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition shadow-sm">
              Load More Deals
           </button>
        </section>

        {/* Informational SEO Content Section */}
        <section className="mb-24 pt-16 border-t border-slate-100 dark:border-slate-800">
           <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 font-display">About {category.name} Tools</h2>
           <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-500 dark:prose-p:text-slate-400 prose-p:font-medium prose-p:leading-relaxed text-lg">
             <p>Discover a curated collection of the best deals and promo codes for {category.name.toLowerCase()} software. We manually verify every offer to ensure you get the maximum savings on essential tools for your workflow.</p>
             <p>Our platform partners with industry leaders to bring you exclusive discounts on premium subscriptions. Whether you're looking for enterprise-grade solutions or startup-friendly tools, you'll find everything you need to scale your output efficiently.</p>
           </div>
        </section>

        {/* Tips for Saving Grid */}
        <section>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 font-display">Tips for Saving on {category.name} Tools</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { i: 'calendar_month', t: 'Choose Annual Plans', d: 'Pay upfront for the year and save up to 40% compared to monthly billing. Most AI tools offer a substantial discount for annual commitments.' },
                { i: 'biotech', t: 'Try Before You Buy', d: 'Look for extended free trials. Many providers offer 14-30 day trial periods with our exclusive partner links before you pay.' },
                { i: 'school', t: 'Student Discounts', d: 'Use your .edu email to unlock academic pricing. Education discounts often slash subscription costs by 50% or more.' },
                { i: 'notifications_active', t: 'Subscribe for Alerts', d: 'Sign up for our newsletter to get flash sale alerts. We notify you the moment high-value limited-time offers go live.' }
              ].map((tip, i) => (
                <div key={i} className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2rem] p-10 border border-emerald-100/50 dark:border-emerald-800/30 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="size-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20">
                      <span className="material-icons-round text-2xl">{tip.i}</span>
                   </div>
                   <h3 className="font-black text-slate-900 dark:text-white mb-4 text-base font-display">{tip.t}</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{tip.d}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      <CouponModal isOpen={!!selectedCoupon} onClose={() => setSelectedCoupon(null)} coupon={selectedCoupon} />
    </Layout>
  );
};

export default CategoryDetailPage;
