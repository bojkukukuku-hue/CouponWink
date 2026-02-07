
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary-500 text-white p-1 rounded-md">
                <span className="material-icons-round text-2xl">local_offer</span>
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white font-display">CouponWink</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
              Your trusted source for verified promo codes and deals on AI tools, hosting, and SaaS products.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'close', label: 'X' },
                { icon: 'facebook', label: 'Facebook' },
                { icon: 'work', label: 'LinkedIn' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="size-10 flex items-center justify-center rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <span className="material-icons-round text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-[10px] tracking-widest">Top Categories</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors">AI Writing Tools</Link></li>
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors">AI Image Generation</Link></li>
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors">Web Hosting</Link></li>
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors">SEO Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-[10px] tracking-widest">Popular Stores</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/store/cloudways" className="hover:text-primary-500 transition-colors">Cloudways</Link></li>
              <li><Link to="/store/jasper" className="hover:text-primary-500 transition-colors">Jasper AI</Link></li>
              <li><Link to="/store/hostinger" className="hover:text-primary-500 transition-colors">Hostinger</Link></li>
              <li><Link to="/store/notion" className="hover:text-primary-500 transition-colors">Notion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-[10px] tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
              <li><Link to="/submit-deal" className="hover:text-primary-500 transition-colors">Submit Deal</Link></li>
              <li><Link to="/blog" className="hover:text-primary-500 transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>© 2024 CouponWink. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/legal" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/legal" className="hover:text-slate-900 dark:hover:text-white transition-colors">Website Builder</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
