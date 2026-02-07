import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import LazySection from "../../components/LazySection";
import CouponModal from "../../components/CouponModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listActiveCouponsPublic } from "../../services/supabaseApi";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function normalize(s: any) {
  return String(s ?? "").toLowerCase().trim();
}

const SearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const q = query.get("q") ?? "";
  const category = query.get("category") ?? "";
  const store = query.get("store") ?? "";

  const [searchQuery, setSearchQuery] = useState(q);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listActiveCouponsPublic();
        setCoupons(data);
      } catch (e: any) {
        console.error(e);
        alert(e?.message || "Failed to load deals");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    const ncat = normalize(category);
    const nstore = normalize(store);

    return (coupons ?? []).filter((c: any) => {
      const title = normalize(c.title);
      const desc = normalize(c.desc ?? c.description);
      const storeId = normalize(c.storeId ?? c.store_id ?? c.store_name);
      const catId = normalize(c.category ?? c.category_name ?? c.category_id);

      const matchQ = !nq || title.includes(nq) || desc.includes(nq) || storeId.includes(nq) || catId.includes(nq);
      const matchStore = !nstore || storeId.includes(nstore);
      const matchCat = !ncat || catId.includes(ncat);

      return matchQ && matchStore && matchCat;
    });
  }, [coupons, q, category, store]);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleShowCode = (deal: any) => {
    const code = deal?.code ?? "";
    if (code) {
      try {
        navigator.clipboard.writeText(code);
      } catch (e) {}
    }
    const partnerLink = deal?.link ?? "#";
    if (partnerLink && partnerLink !== "#") window.open(partnerLink, "_blank");

    setSelectedCoupon({
      storeName: deal?.storeName ?? deal?.store_name ?? deal?.storeId ?? deal?.store_id ?? "Store",
      title: deal?.title ?? "",
      code,
      discountValue: deal?.label ?? deal?.discount_label ?? "",
      link: partnerLink,
    });
  };

  return (
    <Layout>
      <header className="pt-20 pb-10 px-4 text-center bg-gradient-to-b from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 font-display">
            Search Results
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {loading ? "Loading…" : `${filtered.length} deals found`}
          </p>

          <form onSubmit={handleSubmitSearch} className="relative max-w-2xl mx-auto mt-10">
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

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              to="/categories"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              <span className="material-icons-round text-sm">grid_view</span> Browse Categories
            </Link>
            <Link
              to="/blog"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              <span className="material-icons-round text-sm">article</span> Read Blog
            </Link>
          </div>
        </div>
      </header>

      <LazySection className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-slate-500 text-sm">Loading deals…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display mb-2">
                No results
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                Try another keyword or browse categories.
              </p>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-black transition"
              >
                <span className="material-icons-round">grid_view</span> Browse Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((deal: any, i: number) => (
                <div
                  key={deal.id ?? i}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest">
                        {deal.storeId ?? deal.store_id ?? "STORE"}
                      </span>
                      <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="material-icons-round text-xs">verified</span> Verified
                      </span>
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

export default SearchResultsPage;
