import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listPostsAdmin, deletePostAdmin } from '../../services/supabaseApi';

interface PostItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft';
  views: number;
}

function formatDate(input?: string | null) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const statColorClass: Record<string, string> = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500',
};

const AdminPostManagement: React.FC = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await listPostsAdmin();

      const mapped: PostItem[] = (data as any[]).map((p) => ({
        id: p.id,
        title: p.title ?? '',
        category: p.category ?? p.category_name ?? 'General',
        author: p.author ?? p.author_name ?? 'Admin',
        date: formatDate(p.published_at ?? p.updated_at ?? p.created_at),
        status: p.is_published ? 'Published' : 'Draft',
        views: Number(p.views ?? 0),
      }));

      setPosts(mapped);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deletePostAdmin(id);
        await loadPosts();
      } catch (e: any) {
        console.error(e);
        alert(e?.message || 'Failed to delete post');
      }
    }
  };

  const stats = useMemo(() => {
    return [
      { label: 'Total Articles', value: posts.length, color: 'blue', icon: 'article' },
      { label: 'Published', value: posts.filter(p => p.status === 'Published').length, color: 'emerald', icon: 'task_alt' },
      { label: 'Total Views', value: posts.reduce((acc, p) => acc + p.views, 0).toLocaleString(), color: 'purple', icon: 'visibility' },
    ];
  }, [posts]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Articles & News
          </h1>
          <p className="text-slate-500 font-medium">
            Build specialized content to attract users and boost SEO.
          </p>
        </div>

        <Link
          to="/admin/editor"
          className="bg-primary-500 hover:bg-primary-600 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95"
        >
          <span className="material-icons-round">edit_note</span>
          Write New Post
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div
                className={`size-12 rounded-2xl flex items-center justify-center ${
                  statColorClass[stat.color] ?? 'bg-slate-50 dark:bg-slate-900/20 text-slate-500'
                }`}
              >
                <span className="material-icons-round">{stat.icon}</span>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Content Title
                </th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Category
                </th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Status
                </th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Performance
                </th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 px-10 text-slate-500">
                    Loading posts…
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 px-10 text-slate-500">
                    No posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-6 px-10 max-w-md">
                      <div className="flex flex-col">
                        <p className="font-black text-slate-900 dark:text-white font-display truncate text-lg group-hover:text-primary-500 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                          <span className="material-icons-round text-xs">person</span>
                          {post.author}
                          <span className="text-slate-200 dark:text-slate-700">|</span>
                          <span className="material-icons-round text-xs">event</span>
                          {post.date}
                        </p>
                      </div>
                    </td>

                    <td className="py-6 px-10">
                      <span className="text-[10px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-widest">
                        {post.category}
                      </span>
                    </td>

                    <td className="py-6 px-10">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-2.5 rounded-full ${
                            post.status === 'Published'
                              ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                              : 'bg-amber-500'
                          }`}
                        />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                          {post.status}
                        </span>
                      </div>
                    </td>

                    <td className="py-6 px-10">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 dark:text-white text-base">
                          {post.views.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          Views
                        </span>
                      </div>
                    </td>

                    <td className="py-6 px-10 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/editor?id=${post.id}`}
                          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-500 transition shadow-sm"
                        >
                          <span className="material-icons-round text-xl">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition shadow-sm"
                        >
                          <span className="material-icons-round text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPostManagement;
