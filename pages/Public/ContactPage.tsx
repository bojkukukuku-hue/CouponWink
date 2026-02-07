
import React from 'react';
import Layout from '../../components/Layout';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 font-display">Get in Touch</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium">Have a question about a deal? Want to partner with us? Our team is here to help.</p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="size-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-icons-round">email</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                  <p className="text-slate-500 font-medium">support@couponwink.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <span className="material-icons-round">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Office</h4>
                  <p className="text-slate-500 font-medium">123 Savings Blvd, Suite 400<br/>San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Name</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Email</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="Your email" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white">Subject</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium" placeholder="What is this about?" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white">Message</label>
              <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-4 text-sm font-medium h-32" placeholder="Tell us more..."></textarea>
            </div>
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black py-4 rounded-xl shadow-lg shadow-primary-500/20 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
