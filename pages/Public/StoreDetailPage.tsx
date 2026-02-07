import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import LazySection from "../../components/LazySection";
import CouponModal from "../../components/CouponModal";
import { Link, useParams } from "react-router-dom";
import { getStorePublic, listActiveCouponsByStorePublic } from "../../services/supabaseApi";

function pickStoreName(s: any) {
  return s?.name ?? s?.title ?? "Store";
}
function pickStoreDesc(s: any) {
  return s?.description ?? s?.desc ?? "";
}
function pickStoreLogo(s: any) {
  return s?.logo_url ?? s?.logo ?? s?.image_url ?? "";
}
function pickStoreWebsite(s: any) {
  return s?.website ?? s?.site_url ?? s?.url ?? s?.link ?? "";
}

const StoreDetailPage: React.FC = () => {
  const { id } = useParams();
  const [store, setStore] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const s = await getStorePublic(id);
        const c = await listActiveCouponsByStorePublic(id);
        setStore(s);
        setCoupons(c);
      } catch (e: any) {
        console.error(e);
        setStore(null);
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const storeName = useMemo(() => pickStoreName(store), [store]);
  const storeDesc = useMemo(() => pickStoreDesc(store), [store]);
  const storeLogo = useMemo(() => pickStoreLogo(store), [store]);
  const storeWebsite = useMemo(() => pickStoreWebsite(store), [store]);

  const handleShowCode = (deal: any) => {
    const code = deal?.code ?? "";
    if (code) {
      try {
        navigator.clipboard.writeText(code);
      } catch (e) {}
    }
    const partnerLink = deal?.link ?? storeWebsite ?? "#";
    if (partnerLink && partnerLink !== "#") window.open(partnerLink, "_blank");

    setSelectedCoupon({
      storeName,
      title: deal?.title ?? "",
      code,
      discountValue: deal?.label ?? deal?.discount_label ?? "",
      link: partnerLink,
    });
  };

  return (
    <Layout>
      <header className="pt-20 pb-10 px-4 bg-gradient-to-b from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/search"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              <span className="material-icons-round text-sm">arrow_back</span> Back
            </Link>

            {storeWebsite ? (
              <a
                href={storeWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
              >
                Visit Site <span className="material-icons-round text-sm">open_in_new</span>
              </a>
            ) : null}
          </div>

          {loading ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 animate-pulse">
              <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3 mb-2" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
            </div>
          ) : !store ? (
            <div className="text-center py-16">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display mb-2">
                Store not found
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                The store may not exist or the link is incorrect.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                    {storeLogo ? (
                      <img src={storeLogo} alt={storeName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-icons-round text-4xl text-primary-500">storefront</span>
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display mb-3">
                    {storeName}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {storeDesc || "Find the latest verified coupons and deals for this store."}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-900/40">
                      Verified daily
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-[10px] font-black uppercase tracking-widest border border-primary-200 dark:border-primary-900/40">
                      {coupons.length} deals
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <LazySection className="pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                Active Deals
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Click to reveal and copy code
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading deals…</div>
          ) : coupons.length === 0 ? (
            <div className="text-slate-500 text-sm">No active coupons found for this store.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coupons.map((deal: any, i: number) => (
                <div
                  key={deal.id ?? i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="material-icons-round text-xs">verified</span> Verified
                      </span>
                      {deal.type ? (
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest">
                          {deal.type}
                        </span>
                      ) : null}
                    </div>
                    <div className="text-lg font-black text-primary-500">
                      {deal.label ?? deal.discount_label ?? ""}
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                    {deal.title ?? ""}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-grow">
                    {deal.desc ?? deal.description ?? ""}
                  </p>

                  <button
                    onClick={() => handleShowCode(deal)}
                    className="bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-black text-sm transition flex items-center justify-center gap-2"
                  >
                    <span className="material-icons-round text-lg">content_copy</span>
                    Show Code
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </LazySection>

      <CouponModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />
    </Layout>
  );
};

export default StoreDetailPage;
