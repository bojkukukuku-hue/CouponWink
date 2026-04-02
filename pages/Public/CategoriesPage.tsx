
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import LazySection from '../../components/LazySection';
import { MockDB } from '../../services/mockDb';

const CategoryCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 animate-pulse">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6" />
    <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-2/3 mb-3" />
    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full mb-2" />
    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6 mb-8" />
    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-24" />
      <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded" />
    </div>
  </div>
);

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const cats = MockDB.getCategories();
      const stores = MockDB.getStores();
      
      const categoriesWithCount = cats.map(cat => ({
        ...cat,
        count: stores.filter(s => s.category === cat.name || s.category === cat.id).length
      }));
      
      setCategories(categoriesWithCount);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <Layout>
      <header className="pt-20 pb-12 px-4 text-center bg-gradient-to-b from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-500/20 mb-6">
            <span className="material-icons-round text-sm mr-1.5">grid_view</span>
            {categories.length} Categories Found
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 font-display">
            Browse All Categories
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our complete collection of verified stores organized by category. Find the best promo codes and deals for your next project.
          </p>
        </div>
      </header>

      <LazySection 
        className="max-w-7xl mx-auto px-4 pb-24"
        placeholder={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => <CategoryCardSkeleton key={i} />)}
          </div>
        }
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => <CategoryCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={`/search?category=${encodeURIComponent(cat.name)}`} 
                className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-3xl">{cat.icon || 'category'}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors font-display">{cat.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow font-medium leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                    <span className="material-icons-round text-base mr-1.5">storefront</span>
                    {cat.count} stores
                  </div>
                  <span className="material-icons-round text-slate-300 group-hover:text-primary-500 transition-colors">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </LazySection>
    </Layout>
  );
};

export default CategoriesPage;
