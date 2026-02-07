import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPostAdmin, getPostAdmin, updatePostAdmin } from '../../services/supabaseApi';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

const AdminEditor: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get('id'); // nếu có thì edit

  const [loading, setLoading] = useState<boolean>(!!editId);
  const [saving, setSaving] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Review');
  const [content, setContent] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>('');

  const computedSlug = useMemo(() => slugify(title || 'new-post'), [title]);

  useEffect(() => {
    if (!editId) return;

    (async () => {
      try {
        setLoading(true);
        const post: any = await getPostAdmin(editId);

        setTitle(post.title ?? '');
        setCategory(post.category ?? post.category_name ?? 'Review');
        setContent(post.content ?? '');
        setFeaturedImageUrl(post.cover_image_url ?? '');
      } catch (e: any) {
        console.error(e);
        alert(e?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [editId]);

  const buildPayload = (publish: boolean) => {
    return {
      title,
      slug: computedSlug,
      category,                 // bạn có thể đổi tên cột nếu schema khác
      content,
      cover_image_url: featuredImageUrl || null,
      is_published: publish,
      published_at: publish ? new Date().toISOString() : null,
      // bạn có thể bổ sung: excerpt, author_name...
    };
  };

  const save = async (publish: boolean) => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!content.trim()) {
      alert('Please write some content');
      return;
    }

    try {
      setSaving(true);

      const payload = buildPayload(publish);

      let saved: any;
      if (editId) {
        saved = await updatePostAdmin(editId, payload);
      } else {
        saved = await createPostAdmin(payload);
      }

      // Sau khi save, điều hướng về danh sách posts
      navigate('/admin/posts', { replace: true });
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const onPickImage = () => {
    const url = window.prompt('Paste featured image URL (optional):', featuredImageUrl || '');
    if (url !== null) setFeaturedImageUrl(url.trim());
  };

  if (loading) {
    return <div className="p-8 max-w-5xl mx-auto">Loading editor…</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-display">
            {editId ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
          <p className="text-slate-500 font-medium">
            Draft and publish content for the CouponWink blog.
          </p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">
            Slug: {computedSlug}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            disabled={saving}
            onClick={() => save(false)}
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-sm disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>

          <button
            disabled={saving}
            onClick={() => save(true)}
            className="bg-primary-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-primary-500/20 disabled:opacity-60"
          >
            {saving ? 'Publishing…' : 'Publish Post'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border-0 border-b-2 border-slate-100 dark:border-slate-800 py-4 text-4xl font-black font-display focus:border-primary-500 focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-700"
          placeholder="Post Title..."
        />

        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm font-bold"
          >
            <option value="Review">Category: Review</option>
            <option value="Tutorial">Category: Tutorial</option>
            <option value="News">Category: News</option>
          </select>

          <button
            type="button"
            onClick={onPickImage}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-500"
          >
            <span className="material-icons-round text-base">image</span>
            {featuredImageUrl ? 'Change Featured Image' : 'Add Featured Image'}
          </button>

          {featuredImageUrl && (
            <span className="text-xs text-slate-400 font-bold truncate max-w-[420px]">
              {featuredImageUrl}
            </span>
          )}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[50vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 font-medium text-lg focus:ring-2 focus:ring-primary-500 focus:border-0 outline-none"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
};

export default AdminEditor;
