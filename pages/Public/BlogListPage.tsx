import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LazySection from "../../components/LazySection";
import { Link } from "react-router-dom";
import { listPublishedPostsPublic } from "../../services/supabaseApi";

const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden animate-pulse">
    <div className="h-44 bg-slate-100 dark:bg-slate-800" />
    <div className="p-7">
      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-24 mb-3" />
      <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full mb-2" />
      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6 mb-6" />
      <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-800">
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-32" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-16" />
      </div>
    </div>
  </div>
);

function formatDate(input?: string | null) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listPublishedPostsPublic();
        setPosts(data);
      } catch (e: any) {
        console.error(e);
        alert(e?.message || "Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <header className="pt-20 pb-12 px-4 text-center bg-gradient-to-b from-primary-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-500/20 mb-6">
            <span className="material-icons-round text-sm mr-1.5">article</span>
            {loading ? "Loading…" : `${posts.length} Posts`}
          </span>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 font-display">
            CouponWink Blog
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            News, reviews and tutorials about AI tools, hosting, and growth. All the tips to help you save and build faster.
          </p>
        </div>
      </header>

      <LazySection
        className="max-w-7xl mx-auto px-4 pb-24"
        placeholder={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-slate-500 text-sm">No posts published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p: any) => {
              const title = p.title ?? "Untitled";
              const slug = p.slug ?? p.id; // fallback
              const excerpt = p.excerpt ?? p.summary ?? "";
              const cover = p.cover_image_url ?? p.image_url ?? "";
              const category = p.category ?? p.category_name ?? "News";
              const date = formatDate(p.published_at ?? p.created_at ?? p.updated_at);

              return (
                <Link
                  key={p.id ?? slug}
                  to={`/blog/${encodeURIComponent(slug)}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {cover ? (
                      <img
                        src={cover}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="material-icons-round text-5xl">image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-950/70 backdrop-blur text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 border border-white/40">
                        {category}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors font-display line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3 flex-grow">
                      {excerpt || "Read the full article for details."}
                    </p>

                    <div className="flex items-center justify-between pt-5 mt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {date}
                      </div>
                      <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-1">
                        Read <span className="material-icons-round text-sm">arrow_forward</span>
                      </div>
                    </div>
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

export default BlogListPage;
