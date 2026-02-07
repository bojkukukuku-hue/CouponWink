
import React from 'react';
import Layout from '../../components/Layout';

const SubmitDealPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="size-16 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/30">
             <span className="material-icons-round text-3xl">add_shopping_cart</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 font-display">Submit a New Deal</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Found a promo code that isn't on our site? Share it with the community and help others save money.</p>
        </div>

        <form className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-black font-display">Store Information</h3>
            <div className="space-y-2">
              <label className="text-sm font-bold">Store Name</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="e.g. Jasper AI, Cloudways" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Store Website (Optional)</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="https://store.com" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black font-display">Coupon Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Type</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-bold">
                  <option>Promo Code</option>
                  <option>Direct Deal</option>
                  <option>Free Trial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Promo Code</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-mono font-bold" placeholder="e.g. SAVE50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Short Description</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="e.g. 50% off for 6 months" />
            </div>
          </div>

          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black py-4 rounded-xl shadow-lg shadow-primary-500/20 transition">
            Submit Deal for Review
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SubmitDealPage;
