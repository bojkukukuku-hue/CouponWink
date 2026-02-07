
import React from 'react';
import Layout from '../../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 font-display">Saving you money on the tools that matter.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
              CouponWink was founded in 2023 with a simple mission: to help developers, creators, and entrepreneurs access the best AI tools and infrastructure without breaking the bank.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-black text-primary-500 mb-2">100%</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Verified Codes</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-primary-500 mb-2">24/7</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Monitoring</p>
              </div>
            </div>
          </div>
          <div className="flex-1 aspect-square bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden relative border border-slate-200 dark:border-slate-800">
             <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <span className="material-icons-round text-9xl">groups</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6 font-display">Our Philosophy</h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg font-medium leading-relaxed">
            We believe that high-quality software should be accessible to everyone. By partnering with leading SaaS providers, we negotiate exclusive rates for our community, ensuring you always get the best price.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
