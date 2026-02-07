import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "../../components/Layout";
import CouponModal from "../../components/CouponModal";
import { searchCouponsPublic } from "../../services/supabaseApi";

const SearchResultsPage: React.FC = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "";

  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await searchCouponsPublic({ query, category });
        setCoupons(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [query, category]);

  const handleShowCode = (coupon: any) => {
    if (coupon.code) {
      try {
        navigator.clipboard.writeText(coupon.code);
      } catch {}
    }

    window.open(coupon.link || "#", "_blank");

    setSelectedCoupon({
      storeName: coupon.store_name,
      title: coupon.title,
      code: coupon.code,
      discountValue: coupon.discount,
      link: coupon.link,
    });
  };

  return (
    <Layout>
      <section className="pt-20 pb-24 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-black mb-8">
          Search Results{" "}
          <span className="text-primary-500">
            {query || category}
          </span>
        </h1>

        {loading ? (
          <div className="text-slate-500">Searching…</div>
        ) : coupons.length === 0 ? (
          <div className="text-slate-500">No deals found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="border rounded-2xl p-6 bg-white dark:bg-slate-900"
              >
                <div className="flex justify-between mb-2">
                  <Link
                    to={`/store/${coupon.store_id}`}
                    className="font-black hover:text-primary-500"
                  >
                    {coupon.store_name}
                  </Link>
                  {coupon.discount && (
                    <span className="text-primary-500 font-black">
                      {coupon.discount}
                    </span>
                  )}
                </div>

                <h3 className="font-black mb-2">{coupon.title}</h3>
                <p className="text-sm text-slate-500 mb-4">
                  {coupon.description}
                </p>

                <button
                  onClick={() => handleShowCode(coupon)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-black"
                >
                  Show Code
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <CouponModal
        isOpen={!!selectedCoupon}
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
    </Layout>
  );
};

export default SearchResultsPage;
