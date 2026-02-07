import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import LazySection from '../../components/LazySection';
import { listCategoriesPublic } from '../../services/supabaseApi';

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

type CategoryRow = any;

function pickCategoryTitle(c: CategoryRow) {
  return c?.title ?? c?.name ?? c?.category_name ?? 'Category';
}
function pickCategoryDesc(c: CategoryRow) {
  return c?.description ?? c?.desc ?? c?.summary ?? '';
}
function pickCategoryIcon(c: CategoryRow) {
  return c?.icon ?? c?.icon_name ?? 'grid_view';
}
function pickCategoryCount(c: CategoryRow) {
  // nếu DB có count / stores_count / total
  const n = Number(c?.count ?? c?.stores_count ?? c?.total ?? 0);
  return Number.isFinite(n) ? n : 0;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listCategoriesPublic();
        setCategories(data);
      } catch (e: any) {
        console.error(e);
        alert(e?.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = useMemo(() => categories.length, [categories]);

  return (
    <Layout>
      <header className="pt-20 pb-12 px-4 text-center bg-gradient-to-b from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-500/20 mb-6">
            <span className="material-icons-round text-sm mr-1.5">grid_view</span>
            {loading ? 'Loading…' : `${total} Categories Found`}
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
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
          </div>
        }
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-slate-500 text-sm">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat: any) => {
              const title = pickCategoryTitle(cat);
              const desc = pickCategoryDesc(cat);
              const icon = pickCategoryIcon(cat);
              const count = pickCategoryCount(cat);

              // bạn đang dùng Search page dạng /search?category=...
              return (
                <Link
                  key={cat.id ?? title}
                  to={`/search?category=${encodeURIComponent(title)}`}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
                    <span className="material-icons-round text-3xl">{icon}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors font-display">
                    {title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow font-medium leading-relaxed line-clamp-3">
                    {desc || 'Explore deals and promo codes in this category.'}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                      <span className="material-icons-round text-base mr-1.5">storefront</span>
                      {count > 0 ? `${count} stores` : 'Explore'}
                    </div>
                    <span className="material-icons-round text-slate-300 group-hover:text-primary-500 transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </LazySection>
    </Layout>
  );
};

export default CategoriesPage;
