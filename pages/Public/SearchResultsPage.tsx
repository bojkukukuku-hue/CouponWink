
import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Link, useSearchParams } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';

const ITEMS_PER_PAGE = 12;

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const initialCategory = searchParams.get('category') || "";

  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Most Popular");
  
  const [inputValue, setInputValue] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setStores(MockDB.getStores());
    setCategories(MockDB.getCategories());
  }, []);

  const allCategories = useMemo(() => categories.map(c => c.name), [categories]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
      setSearchParams(prev => {
        if (inputValue) prev.set('q', inputValue);
        else prev.delete('q');
        return prev;
      });
    }, 400);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchParams]);

  const filteredStores = useMemo(() => {
    let result = stores.filter(store => {
      const query = searchQuery.toLowerCase();
      const matchesQuery = store.name.toLowerCase().includes(query) || 
                          store.category.toLowerCase().includes(query) ||
                          (store.tags && store.tags.some((t: string) => t.toLowerCase().includes(query)));
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(store.category);
      const matchesFeatured = !showFeaturedOnly || store.featured;
      const isActive = store.status === 'Active';
      return matchesQuery && matchesCategory && matchesFeatured && isActive;
    });

    if (sortBy === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return result;
  }, [stores, searchQuery, selectedCategories, showFeaturedOnly, sortBy]);

  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const paginatedStores = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStores, currentPage]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => {
        const next = prev.includes(cat) ? prev.filter(c => c !== cat) : [cat];
        setSearchParams(p => {
            if (next.length > 0) p.set('category', next[0]);
            else p.delete('category');
            return p;
        });
        return next;
    });
  };

  return (
    <Layout>
      <section className="bg-slate-900 py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-white mb-6 font-display">All Partner Stores</h1>
          <div className="relative max-w-2xl mx-auto mb-8">
            <input 
              className="block w-full pl-14 pr-16 py-5 bg-white border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-primary-500/20 shadow-2xl text-lg font-medium" 
              placeholder="Search stores..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <span className="material-icons-round text-slate-400 text-2xl absolute left-6 top-1/2 -translate-y-1/2">search</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 mb-10">
          <button 
            onClick={() => setSelectedCategories([])}
            className={`px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase transition-all shadow-sm ${selectedCategories.length === 0 ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'}`}
          >
            All Categories
          </button>
          {allCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase transition-all shadow-sm ${selectedCategories.includes(cat) ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {paginatedStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedStores.map((store) => (
              <Link 
                key={store.id} 
                to={`/store/${store.id}`} 
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-6 flex-grow">
                  <div className={`w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner`}>
                    {store.useCustomImage && store.customImage ? (
                      <img src={store.customImage} alt={store.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className={`material-icons-round text-4xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display group-hover:text-primary-500 transition-colors">{store.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg">{store.category}</span>
                    <div className="flex items-center text-amber-400">
                      <span className="material-icons-round text-sm">star</span>
                      <span className="text-slate-900 dark:text-white font-black ml-1">{store.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {store.description}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                   <span className="text-xs font-black text-primary-500 uppercase tracking-widest">View Deals</span>
                   <span className="material-icons-round text-slate-400 group-hover:text-primary-500 transition-colors">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display">No stores found</h2>
             <p className="text-slate-500">Try a different keyword or category.</p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default SearchResultsPage;
