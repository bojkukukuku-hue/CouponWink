
import React from 'react';
import Layout from '../../components/Layout';
import { useParams, Link } from 'react-router-dom';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Layout>
      {/* Article Header */}
      <header className="bg-emerald-50/30 dark:bg-slate-900/30 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link to="/blog" className="inline-flex items-center text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-8 hover:gap-3 transition-all">
            <span className="material-icons-round text-lg mr-2">arrow_back</span> Back to Insights
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200/50">Tutorials</span>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
               <span className="material-icons-round text-xs">event</span> October 15, 2023
            </span>
            <span className="text-slate-200 dark:text-slate-700">|</span>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
               <span className="material-icons-round text-xs">schedule</span> 8 min read
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 font-display leading-[1.1] tracking-tight">
            How to Save 50% on Web Hosting in 2024
          </h1>
          <div className="flex items-center justify-center gap-4">
             <img src="https://i.pravatar.cc/100?u=sarah" alt="Author" className="size-14 rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl" />
             <div className="text-left">
                <p className="text-sm font-black text-slate-900 dark:text-white">Sarah Mitchell</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Savings Expert & Editor</p>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Share Sidebar (Left) */}
          <aside className="hidden lg:block lg:col-span-1">
             <div className="sticky top-32 flex flex-col items-center gap-4">
                <span className="text-[9px] font-black text-slate-300 uppercase vertical-text tracking-[0.3em] mb-4">Share Post</span>
                {['facebook', 'close', 'share'].map(icon => (
                  <button key={icon} className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all flex items-center justify-center shadow-sm">
                    <span className="material-icons-round text-lg">{icon}</span>
                  </button>
                ))}
             </div>
          </aside>

          {/* Article Body (Center) */}
          <div className="lg:col-span-8">
            <div className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-slate-100 dark:border-slate-800">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" alt="Main illustration" className="w-full h-full object-cover" />
            </div>

            <article className="prose prose-slate prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:font-display prose-headings:tracking-tight 
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-medium prose-p:leading-relaxed
              prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white">
              
              <p className="text-xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed mb-12 border-l-4 border-emerald-500 pl-8">
                Finding the right hosting can be expensive, but with the right strategy, you can slash your costs significantly. Most major providers like Hostinger, Cloudways, and Bluehost offer deep discounts for new customers.
              </p>

              <p>When starting a new website or scaling an existing one, the biggest recurring expense is often infrastructure. While it's tempting to go with the cheapest option, <strong>performance and reliability</strong> should never be compromised. Instead, we focus on smart acquisition strategies.</p>
              
              <h3>1. Buy for longer terms</h3>
              <p>Annual plans are almost always cheaper than monthly ones. Often, providers will give you an extra 20-30% off just for committing to 12 months or more. Some even offer up to 80% off if you lock in a 48-month plan, which can result in significant savings over time.</p>
              
              <div className="bg-slate-900 rounded-3xl p-10 my-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16"></div>
                <h4 className="text-white text-2xl font-black mb-4">Pro Tip: The Migration Hack</h4>
                <p className="text-slate-400 mb-0">Many hosts offer free migrations if you switch from a competitor. Look for "Welcome Deals" specifically designed for migration to get both a price break and expert help moving your data.</p>
              </div>

              <h3>2. Use Verified Promo Codes</h3>
              <p>Before checking out, always browse CouponWink for the latest verified codes. We work directly with partners to get exclusive discounts you won't find anywhere else. These are manually checked every 24 hours to ensure they are active.</p>
              
              <p>Additionally, don't forget to look for <strong>stackable offers</strong>. Some providers allow you to use a site-wide sale coupon on top of an existing promotional price, though this is becoming rarer in 2024.</p>

              <h3>3. Leverage Student & Education Discounts</h3>
              <p>If you're a student or working in academia, many hosting platforms provide heavy subsidies. Using your .edu email address can sometimes unlock tiers of service that are either free for a year or discounted by up to 90%.</p>

            </article>

            {/* Post Tags & Author Box */}
            <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
               <div className="flex flex-wrap gap-2 mb-12">
                  {['Web Hosting', 'Saving Money', 'SaaS', 'Infrastructure'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl">#{tag}</span>
                  ))}
               </div>

               <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left border border-slate-100 dark:border-slate-700">
                  <img src="https://i.pravatar.cc/150?u=sarah" className="size-24 rounded-3xl shadow-xl border-4 border-white dark:border-slate-700" alt="" />
                  <div>
                     <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-display">Sarah Mitchell</h4>
                     <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">Sarah is a veteran technical writer with 12 years of experience in the SaaS industry. She specializes in infrastructure optimization and cost-reduction strategies for early-stage startups.</p>
                     <div className="flex justify-center md:justify-start gap-4">
                        <button className="text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:underline">Follow Sarah</button>
                        <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors">More from this Author</button>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Sidebar (Table of Contents / Newsletter) */}
          <aside className="lg:col-span-3 space-y-10">
             <div className="sticky top-32 space-y-10">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                   <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 font-display">Table of Contents</h3>
                   <ul className="space-y-4">
                      {[
                        "Why Hosting Costs Matter",
                        "1. Buy for longer terms",
                        "2. Use Verified Promo Codes",
                        "3. Student Discounts",
                        "Final Verdict"
                      ].map((item, i) => (
                        <li key={i}>
                          <a href="#" className={`text-xs font-bold transition-colors ${i === 1 ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                             {item}
                          </a>
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16"></div>
                   <h3 className="text-xl font-black mb-4 font-display">Never Miss a Saving</h3>
                   <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">Join 50k+ readers getting weekly deal roundups.</p>
                   <form className="space-y-3">
                      <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:bg-white/10" placeholder="Email address" />
                      <button className="w-full bg-emerald-500 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-xl">Join the Club</button>
                   </form>
                </div>
             </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      <section className="bg-slate-50 dark:bg-slate-950 py-24 px-4">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">Keep Reading</h2>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Recommended for you</p>
               </div>
               <Link to="/blog" className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:underline">View Blog Archive</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { title: "Top 5 AI Best Practices for Startups", date: "Jan 2, 2025", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400" },
                  { title: "Mastering Cloud Infrastructure in 2025", date: "Dec 18, 2024", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400" },
                  { title: "Building a Design System on a Budget", date: "Dec 10, 2024", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400" },
               ].map((post, i) => (
                  <Link key={i} to="/blog/related" className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                     <div className="aspect-video overflow-hidden">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                     </div>
                     <div className="p-8">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-3">{post.date}</span>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors leading-tight">{post.title}</h4>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>
    </Layout>
  );
};

export default BlogDetailPage;
