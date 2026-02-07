import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import CouponModal from "../../components/CouponModal";
import { getStorePublic, listCouponsByStorePublic } from "../../services/supabaseApi";

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
        const storeData = await getStorePublic(id);
        const couponData = await listCouponsByStorePublic(id);

        setStore(storeData);
        setCoupons(couponData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleShowCode = (coupon: any) => {
    if (coupon.code) {
      try {
        navigator.clipboard.writeText(coupon.code);
      } catch {}
    }

    const link = coupon.link || store?.website || "#";
    window.open(link, "_blank");

    setSelectedCoupon({
      storeName: store?.name,
      title: coupon.title,
      code: coupon.code,
      discountValue: coupon.discount,
      link,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center text-slate-500">Loading store…</div>
      </Layout>
    );
  }

  if (!store) {
    return (
      <Layout>
        <div className="py-32 text-center text-slate-500">Store not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-20 pb-12 max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-6 mb-10">
          {store.logo_url && (
            <img
              src={store.logo_url}
              alt={store.name}
              className="w-20 h-20 rounded-2xl object-contain border"
            />
          )}
          <div>
            <h1 className="text-4xl font-black">{store.name}</h1>
            <p className="text-slate-500 mt-2">{store.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border rounded-2xl p-6 bg-white dark:bg-slate-900"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-lg">{coupon.title}</h3>
                {coupon.discount && (
                  <span className="text-primary-500 font-black">
                    {coupon.discount}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500 mb-6">
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
      </section>

      <CouponModal
        isOpen={!!selectedCoupon}
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
    </Layout>
  );
};

export default StoreDetailPage;
