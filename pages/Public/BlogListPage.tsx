
import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

const BlogListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const initialFeaturedPosts = [
    {
      id: '1',
      title: "The Ultimate Guide to Coupon Stacking: Save Up to 70% on Every Purchase",
      excerpt: "Learn the art of combining multiple discounts, cashback offers, and promo codes to maximize your savings on every online purchase.",
      category: "Saving Tips",
      readTime: "8 min read",
      author: "Sarah Mitchell",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: '2',
      title: "Best AI Tools Discounts in 2025: Complete Buyer's Guide",
      excerpt: "Discover the top AI writing, image generation, and productivity tools with exclusive discounts and how to get the best deals.",
      category: "AI Tools",
      readTime: "12 min read",
      author: "James Chen",
      date: "2025-01-12",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const initialAllPosts = [
    { id: '3', title: "Web Hosting Deals Compared: Which Provider Offers the Best Value?", excerpt: "A comprehensive comparison of Cloudways, Hostinger, Bluehost, and more with current promo codes and long-term pricing analysis.", category: "Hosting", readTime: "10 min", author: "Michael Torres", date: "2025-01-10", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400" },
    { id: '4', title: "How to Prepare for Black Friday: A Month-by-Month Strategy", excerpt: "Start planning now for the biggest shopping event of the year. Our timeline ensures you never miss a deal.", category: "Saving Tips", readTime: "7 min", author: "Sarah Mitchell", date: "2025-01-08", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400" },
    { id: '5', title: "10 Ways to Save on SaaS Subscriptions Without Sacrificing Quality", excerpt: "From annual billing tricks to lesser-known discount programs, learn how to cut your software costs significantly.", category: "SaaS", readTime: "6 min", author: "Emily Watson", date: "2025-01-05", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
    { id: '6', title: "Student Discounts You Didn't Know Existed: 50+ Hidden Deals", excerpt: "From AI tools to hosting services, discover exclusive student pricing that can save you thousands annually.", category: "Guides", readTime: "9 min", author: "Alex Rivera", date: "2025-01-03", image: "https://images.unsplash.com/photo-1523240715639-99f84d3e8188?auto=format&fit=crop&q=80&w=400" },
    { id: '7', title: "Domain Registration Deals: How to Get Premium Domains for Less", excerpt: "Expert tips on finding the best domain deals, transfer discounts, and avoiding renewal price traps.", category: "Domains", readTime: "5 min", author: "Michael Torres", date: "2024-12-28", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" },
    { id: '8', title: "Top Cashback Apps Compared: Maximize Your Returns in 2025", excerpt: "We tested 15 cashback apps to find which ones actually deliver the best returns and easiest redemption.", category: "Saving Tips", readTime: "11 min", author: "Emily Watson", date: "2024-12-25", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400" },
  ];

  const categories = useMemo(() => [
    { name: "Saving Tips", count: 3 },
    { name: "AI Tools", count: 1 },
    { name: "Hosting", count: 1 },
    { name: "SaaS", count: 1 },
    { name: "Guides", count: 1 },
    { name: "Domains", count: 1 },
  ], []);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filterFn = (post: any) => {
        const matchesQuery = post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
        const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
        return matchesQuery && matchesCategory;
    };

    return {
        featured: initialFeaturedPosts.filter(filterFn),
        all: initialAllPosts.filter(filterFn)
    };
  }, [searchQuery, activeCategory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-emerald-50/50 dark:bg-slate-900/50 pt-20 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="material-icons-round text-sm">article</span> Deal Tips & Guides
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 font-display tracking-tight leading-tight">
            Smart Shopping <span className="text-emerald-500">Insights</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
            Expert tips, deal guides, and money-saving strategies to help you shop smarter and save more on every purchase.
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-300">search</span>
            </div>
            <input 
              className="w-full pl-14 pr-32 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition shadow-sm" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-32 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2">
                    <span className="material-icons-round">close</span>
                </button>
            )}
            <div className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-white px-8 rounded-xl font-bold flex items-center justify-center">
              Search
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
            <span className="text-slate-300">Popular:</span>
            {["Coupon Stacking", "AI Tools", "Student Discounts"].map(tag => (
                <button key={tag} onClick={() => setSearchQuery(tag)} className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full hover:text-emerald-500 transition-colors shadow-sm">{tag}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Articles - Only show if not searching or if items found */}
        {filteredData.featured.length > 0 && searchQuery === "" && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white font-display">Featured Articles</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Our top picks for savvy shoppers</p>
              </div>
              <div className="size-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                 <span className="material-icons-round">star</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredData.featured.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{post.category}</span>
                      <span className="text-white/70 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="material-icons-round text-xs">schedule</span> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                    <p className="text-slate-300 text-sm font-medium mb-6 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List of Articles */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                    {searchQuery ? `Search results for "${searchQuery}"` : 'All Articles'}
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {filteredData.all.length + (searchQuery ? filteredData.featured.length : 0)} articles found
                </p>
              </div>
            </div>

            {(filteredData.all.length > 0 || filteredData.featured.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* When searching, include featured posts in the list */}
                {[...(searchQuery ? filteredData.featured : []), ...filteredData.all].map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-emerald-50/90 dark:bg-slate-800/90 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-100 dark:border-slate-700">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
                         <span className="flex items-center gap-1"><span className="material-icons-round text-xs">schedule</span> {post.readTime}</span>
                         <span className="text-slate-200 dark:text-slate-700">|</span>
                         <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-20 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
                   <div className="size-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <span className="material-icons-round text-4xl text-slate-300">find_in_page</span>
                   </div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No articles found</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">We couldn't find any blog posts matching your search criteria.</p>
                   <button onClick={() => {setSearchQuery(""); setActiveCategory("All Posts");}} className="mt-8 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Clear all filters</button>
                </div>
            )}

            {filteredData.all.length > 0 && (
                <div className="mt-16 text-center">
                    <button className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm flex items-center gap-3 mx-auto">
                        Load More Articles <span className="material-icons-round">arrow_downward</span>
                    </button>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <span className="material-icons-round text-emerald-500">folder_open</span>
                 <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">Categories</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveCategory("All Posts")}
                    className={`w-full flex items-center justify-between p-3 rounded-xl font-black text-[11px] uppercase tracking-widest border transition-all ${activeCategory === "All Posts" ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-transparent'}`}
                  >
                    <span>All Posts</span>
                    <span className="bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg shadow-sm">8</span>
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl font-black text-[11px] uppercase tracking-widest border transition-all ${activeCategory === cat.name ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-transparent'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg transition-colors">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default BlogListPage;
