
import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useParams, Link, Navigate } from 'react-router-dom';
import CouponModal from '../../components/CouponModal';
import { MockDB } from '../../services/mockDb';

const StoreDetailPage: React.FC = () => {
  const { id } = useParams();
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Verified' | 'Popular'>('All');
  
  const [store, setStore] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stores = MockDB.getStores();
    const foundStore = stores.find((s: any) => s.id === id);
    if (foundStore) {
      setStore(foundStore);
      const allCoupons = MockDB.getCoupons().filter((c: any) => c.storeId === id && c.status === 'Active');
      setCoupons(allCoupons);
    }
    setLoading(false);
  }, [id]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter(coupon => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Verified') return true; // Most are verified in our mock
      if (activeFilter === 'Popular') return coupon.usage > 500;
      return true;
    });
  }, [activeFilter, coupons]);

  if (loading) return <Layout><div className="p-20 text-center">Loading...</div></Layout>;
  if (!store) return <Navigate to="/404" replace />;

  const handleReveal = (coupon: any) => {
    // 1. Copy code
    if (coupon.code) {
      try {
        navigator.clipboard.writeText(coupon.code);
      } catch (e) {}
    }

    // 2. Open Partner Link
    const partnerLink = coupon.link || store.website || '#';
    window.open(partnerLink, '_blank');
    
    // 3. Show Modal
    setSelectedCoupon({
      storeName: store.name,
      title: coupon.title,
      code: coupon.code,
      discountValue: coupon.label,
      link: partnerLink
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-[10px] font-black text-slate-400 mb-10 items-center gap-2 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span className="material-icons-round text-sm">chevron_right</span>
          <Link to="/search" className="hover:text-primary-500 transition-colors">Stores</Link>
          <span className="material-icons-round text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-black">{store.name}</span>
        </nav>

        {/* Store Header */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 p-10 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
            <div className="w-40 h-40 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 shrink-0 shadow-lg border border-slate-100 dark:border-slate-700">
               {store.useCustomImage && store.customImage ? (
                  <img src={store.customImage} alt={store.name} className="w-full h-full object-cover" />
               ) : (
                  <span className={`material-icons-round text-7xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
               )}
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight mb-4">{store.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => <span key={i} className="material-icons-round text-xl">star</span>)}
                </div>
                <span className="text-lg font-black text-slate-900 dark:text-white">{store.rating}</span>
                <span className="text-slate-400 font-bold">({store.reviews || 0} reviews)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed font-medium">
                {store.description}
              </p>
              <a href={store.website} target="_blank" rel="noopener noreferrer" className="inline-flex bg-primary-500 hover:bg-primary-600 text-white font-black px-10 py-4 rounded-2xl items-center gap-3 transition shadow-xl shadow-primary-500/20 active:scale-95">
                Go to Website <span className="material-icons-round">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Coupon List */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Active Offers ({filteredCoupons.length})</h2>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1">
              {(['All', 'Verified', 'Popular'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter 
                      ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredCoupons.map((coupon, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                 <div className="shrink-0 text-center md:text-left min-w-[120px]">
                    <div className="text-4xl font-black text-primary-500 mb-1 leading-none">{coupon.label}</div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount</p>
                 </div>
                 <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-display">{coupon.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{coupon.desc}</p>
                 </div>
                 <div className="shrink-0 w-full md:w-64">
                    <button 
                      onClick={() => handleReveal(coupon)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-primary-500/30 hover:border-primary-500 rounded-2xl py-4 px-6 font-black text-primary-500 uppercase tracking-widest text-xs transition-all flex items-center justify-between"
                    >
                      <span>{coupon.type === 'Code' ? '••••••••' : 'ACTIVATE'}</span>
                      <span className="bg-primary-500 text-white px-4 py-2 rounded-xl">Reveal</span>
                    </button>
                 </div>
              </div>
            ))}
            {filteredCoupons.length === 0 && (
              <div className="p-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                <p className="text-slate-400 font-bold">No active coupons found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CouponModal 
        isOpen={!!selectedCoupon} 
        onClose={() => setSelectedCoupon(null)} 
        coupon={selectedCoupon} 
      />
    </Layout>
  );
};

export default StoreDetailPage;
