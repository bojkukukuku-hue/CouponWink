
import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useParams, Link, Navigate } from 'react-router-dom';
import CouponModal from '../../components/CouponModal';
import { MockDB } from '../../services/mockDb';

const StoreDetailPage: React.FC = () => {
  const { id } = useParams();
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Verified' | 'Codes' | 'Deals'>('All');
  
  const [store, setStore] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [similarStores, setSimilarStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stores = MockDB.getStores();
    const settings = MockDB.getSettings();
    const sidebarLimit = settings.display?.sidebarStoreCount || 3;
    
    const foundStore = stores.find((s: any) => s.id === id);
    if (foundStore) {
      setStore(foundStore);
      const allCoupons = MockDB.getCoupons().filter((c: any) => c.storeId === id && c.status === 'Active');
      setCoupons(allCoupons);
      setSimilarStores(stores.filter(s => s.category === foundStore.category && s.id !== id).slice(0, sidebarLimit));
    }
    setLoading(false);
  }, [id]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter(coupon => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Verified') return true; 
      if (activeFilter === 'Codes') return !!coupon.code;
      if (activeFilter === 'Deals') return !coupon.code;
      return true;
    });
  }, [activeFilter, coupons]);

  if (loading) return <Layout><div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Loading Store Profile...</div></Layout>;
  if (!store) return <Navigate to="/404" replace />;

  const handleReveal = (coupon: any) => {
    const partnerLink = coupon.link || store.website || '#';
    if (coupon.code) { try { navigator.clipboard.writeText(coupon.code); } catch (e) {} }
    window.open(partnerLink, '_blank');
    setSelectedCoupon({ storeName: store.name, title: coupon.title, code: coupon.code, discountValue: coupon.label, link: partnerLink });
  };

  return (
    <Layout>
      {/* Breadcrumb Bar */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
           <nav className="flex text-[10px] font-black text-slate-400 items-center gap-2 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <span className="material-icons-round text-sm opacity-50">chevron_right</span>
            <Link to="/search" className="hover:text-primary-500 transition-colors">Stores</Link>
            <span className="material-icons-round text-sm opacity-50">chevron_right</span>
            <span className="text-slate-900 dark:text-white">{store.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Store Hero Design */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="size-36 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-6 shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm">
               {store.useCustomImage && store.customImage ? (
                  <img src={store.customImage} alt={store.name} className="w-full h-full object-contain" />
               ) : (
                  <span className={`material-icons-round text-7xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
               )}
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">{store.name}</h1>
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800 flex items-center gap-1">
                      <span className="material-icons-round text-xs">stars</span> Featured Store
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <span key={i} className="material-icons-round text-lg">{i < 4.5 ? 'star' : 'star_half'}</span>)}
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{store.rating}</span>
                    <span className="text-xs text-slate-400 font-bold">({store.reviews || '892'} reviews)</span>
                  </div>
                </div>
                <a href={store.website} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-10 py-4 rounded-xl text-xs flex items-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-500/10">
                  Visit Store <span className="material-icons-round text-lg">open_in_new</span>
                </a>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-4xl mb-6">
                {store.description || 'Verified promo codes and discounts for your favorite tools. Save more on annual plans and subscriptions.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI Writing Tools', 'AI Writing', 'Content Creation', 'Marketing'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs Navigation */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 gap-10">
           {[
             { label: 'Promo Codes', icon: 'local_offer', count: coupons.length },
             { label: 'Store Stats', icon: 'bar_chart' },
             { label: 'Store Info', icon: 'info' },
             { label: 'Similar Stores', icon: 'group' }
           ].map((tab, i) => (
             <button key={tab.label} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${i === 0 ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-lg">{tab.icon}</span>
                  {tab.label} {tab.count !== undefined && <span className="ml-1 opacity-50">{tab.count}</span>}
                </div>
                {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full"></div>}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Coupon List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">All {store.name} Promo Codes <span className="text-slate-400 font-bold ml-2">({filteredCoupons.length} available)</span></h2>
              <div className="flex gap-2">
                <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1 w-fit mb-6">
              {(['All', 'Verified', 'Codes', 'Deals'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {filteredCoupons.map((coupon, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:border-emerald-500/50 transition-all group">
                   <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-grow">
                         <div className="flex items-center gap-2 mb-3">
                           <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 flex items-center gap-1">
                             <span className="material-icons-round text-[10px]">verified</span> Verified
                           </span>
                           {coupon.usage > 200 && (
                             <span className="px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[9px] font-black uppercase tracking-widest border border-orange-100 dark:border-orange-800 flex items-center gap-1">
                               <span className="material-icons-round text-[10px]">local_fire_department</span> Popular
                             </span>
                           )}
                         </div>
                         <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">{coupon.title}</h3>
                         <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">{coupon.desc || 'Enjoy savings on your favorite tools with this exclusive offer.'}</p>
                         
                         <div className="flex flex-wrap items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50 dark:border-slate-800/50">
                            <span className="flex items-center gap-1.5"><span className="material-icons-round text-sm opacity-60">schedule</span> Jan 15, 2025</span>
                            <span className="flex items-center gap-1.5"><span className="material-icons-round text-sm opacity-60">person</span> {coupon.usage?.toLocaleString() || '7,823'} used</span>
                            <span className="flex items-center gap-1.5 text-emerald-500"><span className="material-icons-round text-sm">thumb_up</span> 100% success</span>
                         </div>
                      </div>
                      <div className="shrink-0 flex flex-col justify-center items-center md:items-end min-w-[200px]">
                         <div className="text-3xl font-black text-emerald-500 mb-6">{coupon.label}</div>
                         <button 
                            onClick={() => handleReveal(coupon)}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-8 rounded-xl text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-500/10 transition flex items-center justify-center gap-2 active:scale-95"
                         >
                            <span className="material-icons-round text-lg">{coupon.code ? 'content_copy' : 'bolt'}</span>
                            {coupon.code ? 'Get Code' : 'Get This Deal'}
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Store Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
               {[
                 { label: 'Active Codes', val: coupons.length, color: 'text-primary-500' },
                 { label: 'Success Rate', val: '97%', color: 'text-emerald-500' },
                 { label: 'Total Saved', val: '$89K', color: 'text-emerald-600' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <div className={`text-xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>

            {/* Detailed Store Information */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
               <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">Store Information</h3>
               <div className="space-y-6">
                  {[
                    { l: 'Category', v: store.category, link: true },
                    { l: 'Rating', v: '⭐ ' + store.rating + '/5' },
                    { l: 'Reviews', v: store.reviews || '892' },
                    { l: 'Last Updated', v: 'Jan 15, 2025' }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                       <span className="font-bold text-slate-400">{row.l}</span>
                       <span className={`font-black ${row.link ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                         {row.v}
                       </span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Similar Stores Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
               <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">Similar Stores</h3>
               <div className="space-y-6">
                 {similarStores.map(s => (
                   <Link key={s.id} to={`/store/${s.id}`} className="flex items-center gap-4 group">
                      <div className={`size-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 transition-colors group-hover:border-primary-500`}>
                        <span className={`material-icons-round text-2xl ${s.color || 'text-primary-500'}`}>{s.logo || 'storefront'}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                         <p className="font-black text-slate-900 dark:text-white text-[14px] truncate group-hover:text-primary-500 transition-colors">{s.name}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{MockDB.getCoupons().filter(c => c.storeId === s.id).length} codes • {s.category}</p>
                      </div>
                      <span className="material-icons-round text-slate-300 text-lg group-hover:text-primary-500 group-hover:translate-x-1 transition-all">chevron_right</span>
                   </Link>
                 ))}
               </div>
            </div>

            {/* Submit Code Promotion */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2.5rem] p-10 border border-emerald-100 dark:border-emerald-800 text-center">
               <div className="size-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mx-auto mb-5 shadow-sm text-emerald-500 border border-emerald-50 dark:border-slate-700">
                  <span className="material-icons-round text-2xl">loyalty</span>
               </div>
               <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 font-display">Have a code?</h4>
               <p className="text-[11px] text-slate-500 font-medium mb-8 leading-relaxed">Share a promo code and help others save money. Get featured on our homepage.</p>
               <Link to="/submit-deal" className="block w-full bg-emerald-500 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/10 active:scale-95 transition-all">Submit a Code</Link>
            </div>
          </aside>
        </div>
      </div>

      <CouponModal isOpen={!!selectedCoupon} onClose={() => setSelectedCoupon(null)} coupon={selectedCoupon} />
    </Layout>
  );
};

export default StoreDetailPage;
