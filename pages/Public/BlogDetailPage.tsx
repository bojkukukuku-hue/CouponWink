import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LazySection from "../../components/LazySection";
import { Link, useParams } from "react-router-dom";
import { getPublishedPostBySlugPublic } from "../../services/supabaseApi";

function formatDate(input?: string | null) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const BlogDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 pb-24 animate-pulse">
    <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-32 mt-10 mb-6" />
    <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-4" />
    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-48 mb-10" />
    <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-3xl mb-10" />
    <div className="space-y-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full" />
      ))}
    </div>
  </div>
);

const BlogDetailPage: React.FC = () => {
  const { id } = useParams(); // route: /blog/:id (id là slug)
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getPublishedPostBySlugPublic(id);
        setPost(data);
      } catch (e: any) {
        console.error(e);
        setPost(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <BlogDetailSkeleton />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200 dark:border-slate-800">
            <span className="material-icons-round text-sm">info</span> Not Found
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3 font-display">
            Post not found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">
            This article may be unpublished or the link is incorrect.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-black transition"
          >
            <span className="material-icons-round">arrow_back</span>
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const title = post.title ?? "Untitled";
  const cover = post.cover_image_url ?? post.image_url ?? "";
  const excerpt = post.excerpt ?? post.summary ?? "";
  const category = post.category ?? post.category_name ?? "News";
  const date = formatDate(post.published_at ?? post.created_at ?? post.updated_at);

  // content: ưu tiên HTML nếu bạn lưu HTML, fallback text
  const html = post.content_html ?? post.html ?? null;
  const text = post.content ?? post.body ?? "";

  return (
    <Layout>
      <LazySection className="pb-24">
        <div className="max-w-4xl mx-auto px-4 pt-20">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="text-xs font-black text-slate-400 hover:text-primary-500 uppercase tracking-widest flex items-center gap-2 transition border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg bg-white dark:bg-slate-900"
            >
              <span className="material-icons-round text-sm">arrow_back</span> Back
            </Link>

            <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-black uppercase tracking-widest border border-primary-500/20">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 font-display">
            {title}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-10">
            {date}
          </p>

          {cover ? (
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 mb-10">
              <img src={cover} alt={title} className="w-full h-[360px] object-cover" />
            </div>
          ) : null}

          {excerpt ? (
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-10">
              <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                {excerpt}
              </p>
            </div>
          ) : null}

          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black">
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
            )}
          </article>
        </div>
      </LazySection>
    </Layout>
  );
};

export default BlogDetailPage;
