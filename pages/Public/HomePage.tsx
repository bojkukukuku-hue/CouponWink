import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import LazySection from "../../components/LazySection";
import CouponModal from "../../components/CouponModal";

import {
  listStoresPublic,
  listCategoriesPublic,
  listActiveCouponsPublic,
} from "../../services/supabaseApi";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map store_id -> store object để render store name/logo nhanh
  const storeMap = useMemo(() => {
    const m = new Map<string, any>();
    for (const s of stores) m.set(s.id, s);
    return m;
  }, [stores]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [storesData, categoriesData, couponsData] = await Promise.all([
          listStoresPublic(),
          listCategoriesPublic(),
          listActiveCouponsPublic(),
        ]);

        setStores(storesData);
        setCategories(categoriesData);
        setCoupons(couponsData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleShowCode = (coupon: any) => {
    if (coupon?.code) {
      try {
        navigator.clipboard.writeText(coupon.code);
      } catch {}
    }

    const store = storeMap.get(coupon.store_id);
    const partnerLink = coupon.link || store?.website || "#";
    if (partnerLink && partnerLink !== "#") window.open(partnerLink, "_blank");

    setSelectedCoupon({
      storeName: store?.name || "Store",
      title: coupon.title,
      code: coupon.code,
      discountValue: coupon.discount || "",
      link: partnerLink,
    });
  };

  const faqs = [
    {
      q: "Are all the promo codes verified?",
      a: "Yes, our team verifies promo codes regularly to ensure they are active and working.",
    },
    { q: "Is CouponWink free to use?", a: "Yes, CouponWink is 100% free." },
    {
      q: "How often are new codes added?",
      a: "We update our deals continuously as new offers become available.",
    },
    {
      q: "What if a code doesn't work?",
      a: "Some deals may expire early. Please report broken codes and we will review.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-white dark:bg-slate-950 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-500/5 to-transparent -z-10" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-800">
            <span className="material-icons-round text-sm">verified</span> All codes verified
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight font-display leading-[1.1]">
            Verified Promo Codes for <br />
            <span className="text-primary-500">AI Tools & Hosting</span>
          </h1>

          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Save money on the best AI tools, hosting services, and SaaS products.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }}
            className="relative max-w-2xl mx-auto mb-10"
          >
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
        </div>
      </section>

      {/* Trending Stores */}
      <LazySection className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                Trending Stores
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Most popular deals this week
              </p>
            </div>

            <Link
              to="/search"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              View All <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-slate-500">Loading stores…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.slice(0, 6).map((store) => (
                <Link
                  key={store.id}
                  to={`/store/${store.id}`}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="size-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                      {store.logo_url ? (
                        <img
                          src={store.logo_url}
                          alt={store.name}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="material-icons-round text-3xl text-primary-500">
                          storefront
                        </span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-black text-slate-900 dark:text-white">{store.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">
                        {store.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-3 flex items-center justify-between group-hover:border-primary-500 transition-all">
                    <span className="text-xs font-black flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <span className="material-icons-round text-base">local_offer</span>
                      Save at {store.name}
                    </span>
                    <span className="material-icons-round text-base text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </LazySection>

      {/* Categories */}
      <LazySection className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                Browse by Category
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Find the best deals organized by product type
              </p>
            </div>

            <Link
              to="/categories"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              View All <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-slate-500">Loading categories…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((cat: any) => (
                <Link
                  key={cat.id}
                  to={`/search?category=${encodeURIComponent(cat.id)}`}
                  className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-xl transition-all group"
                >
                  <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-primary-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <span className="material-icons-round text-2xl">category</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors font-display">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {cat.description || "Browse deals in this category."}
                  </p>
                  <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                    <span>Explore</span>
                    <span className="material-icons-round text-base">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </LazySection>

      {/* Best Deals */}
      <LazySection className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 font-display">
            Today's Best Deals
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">
            Hand-picked offers expiring soon
          </p>

          {loading ? (
            <div className="text-slate-500">Loading coupons…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coupons.slice(0, 3).map((coupon: any) => {
                const store = storeMap.get(coupon.store_id);
                return (
                  <div
                    key={coupon.id}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest">
                          {store?.name || "Store"}
                        </span>
                        <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <span className="material-icons-round text-xs">verified</span> Verified
                        </span>
                      </div>

                      <div className="text-lg font-black text-primary-500">
                        {coupon.discount || ""}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                      {coupon.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-grow">
                      {coupon.description || ""}
                    </p>

                    <button
                      onClick={() => handleShowCode(coupon)}
                      className="flex-grow bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-black text-sm transition flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-round text-lg">content_copy</span>
                      Show Code
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </LazySection>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 font-display text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-slate-900 dark:text-white text-left"
                >
                  <span>{faq.q}</span>
                  <span
                    className="material-icons-round text-slate-400 transition-transform duration-300"
                    style={{ transform: activeFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    activeFaq === i ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {faq.a}
                  </p>
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
