
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Content' | 'SEO' | 'Settings'>('Content');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: 'Review',
    featuredImage: '',
    status: 'Draft',
    seo: {
      metaTitle: '',
      metaDesc: '',
      keywords: '',
      canonicalUrl: ''
    }
  });

  // Tự động tạo slug từ tiêu đề
  useEffect(() => {
    if (!id && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, id]);

  const handleSave = () => {
    alert("Bài viết đã được lưu thành công!");
    navigate('/admin/posts');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/admin/posts')} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 flex items-center justify-center transition">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight font-display">{id ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h1>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Trạng thái: <span className="text-amber-500">{formData.status}</span></p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition">Lưu nháp</button>
          <button onClick={handleSave} className="bg-primary-500 text-slate-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/20 active:scale-95 transition">Xuất bản</button>
        </div>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1 w-fit">
        {(['Content', 'SEO', 'Settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'Content' ? 'Nội dung' : tab === 'SEO' ? 'Tối ưu SEO' : 'Cấu hình'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           {activeTab === 'Content' && (
             <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  <input 
                    className="w-full bg-transparent border-0 border-b-2 border-slate-50 dark:border-slate-800 py-4 text-4xl font-black font-display focus:border-primary-500 focus:ring-0 placeholder:text-slate-200 dark:placeholder:text-slate-700" 
                    placeholder="Tiêu đề bài viết..." 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Permalink:</span>
                    <span className="text-xs text-slate-400 font-mono truncate">couponwink.com/blog/</span>
                    <input 
                      className="flex-grow bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-primary-500 outline-none" 
                      value={formData.slug}
                      onChange={e => setFormData({...formData, slug: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                     <select 
                      className="bg-slate-50 dark:bg-slate-800 border-0 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                     >
                       <option>Chuyên mục: Review</option>
                       <option>Chuyên mục: Tutorial</option>
                       <option>Chuyên mục: News</option>
                       <option>Chuyên mục: Case Study</option>
                     </select>
                     <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-500 transition">
                       <span className="material-icons-round text-base">image</span> Ảnh đại diện
                     </button>
                  </div>

                  <textarea 
                    className="w-full h-[60vh] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 font-medium text-lg focus:ring-4 focus:ring-primary-500/5 outline-none resize-none" 
                    placeholder="Bắt đầu viết nội dung tại đây..."
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                  ></textarea>
                </div>
             </div>
           )}

           {activeTab === 'SEO' && (
             <div className="space-y-8 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
                  <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="material-icons-round text-sm">visibility</span> Google Search Preview
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xl text-[#1a0dab] dark:text-blue-400 font-medium truncate">{formData.seo.metaTitle || (formData.title || 'Tiêu đề Meta chưa nhập')}</p>
                      <p className="text-sm text-[#006621] dark:text-emerald-500 truncate">https://couponwink.com/blog/{formData.slug}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{formData.seo.metaDesc || 'Vui lòng nhập mô tả meta để tối ưu hiển thị trên công cụ tìm kiếm.'}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">SEO Title (Meta Title)</label>
                      <input 
                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 font-bold border-0 focus:ring-2 focus:ring-blue-500" 
                        placeholder="Tiêu đề hiển thị trên Google..."
                        value={formData.seo.metaTitle}
                        onChange={e => setFormData({...formData, seo: {...formData.seo, metaTitle: e.target.value}})}
                      />
                      <p className="text-[9px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">Độ dài tối ưu: 50-60 ký tự</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Meta Description</label>
                      <textarea 
                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 font-medium h-32 border-0 focus:ring-2 focus:ring-blue-500 resize-none" 
                        placeholder="Mô tả ngắn xuất hiện dưới kết quả tìm kiếm..."
                        value={formData.seo.metaDesc}
                        onChange={e => setFormData({...formData, seo: {...formData.seo, metaDesc: e.target.value}})}
                      />
                      <p className="text-[9px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">Độ dài tối ưu: 150-160 ký tự</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Focus Keywords</label>
                          <input 
                            className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 font-bold border-0 focus:ring-2 focus:ring-blue-500" 
                            placeholder="Từ khóa chính (cách nhau bằng dấu phẩy)..."
                            value={formData.seo.keywords}
                            onChange={e => setFormData({...formData, seo: {...formData.seo, keywords: e.target.value}})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Canonical URL</label>
                          <input 
                            className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 font-bold border-0 focus:ring-2 focus:ring-blue-500" 
                            placeholder="URL chính tắc (nếu có)..."
                            value={formData.seo.canonicalUrl}
                            onChange={e => setFormData({...formData, seo: {...formData.seo, canonicalUrl: e.target.value}})}
                          />
                       </div>
                    </div>
                  </div>
                </div>
             </div>
           )}

           {activeTab === 'Settings' && (
             <div className="space-y-8 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trạng thái xuất bản</label>
                    <div className="flex gap-4">
                      {['Draft', 'Pending', 'Published'].map(s => (
                        <button 
                          key={s}
                          onClick={() => setFormData({...formData, status: s})}
                          className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${formData.status === s ? 'bg-primary-500 border-primary-500 text-slate-900 shadow-lg' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm sticky top-10">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Thông tin bài viết</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tác giả</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">Jane Admin</span>
                 </div>
                 <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian đọc</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">~ {Math.ceil(formData.content.split(' ').length / 200)} phút</span>
                 </div>
                 <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ảnh đã tải</span>
                    <span className="text-sm font-black text-primary-500">0 ảnh</span>
                 </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Đánh giá nội dung</p>
                 <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                       <div className={`h-full bg-emerald-500 transition-all duration-500`} style={{ width: `${Math.min(100, (formData.title.length > 0 ? 30 : 0) + (formData.content.length > 500 ? 40 : 10) + (formData.seo.metaDesc.length > 100 ? 30 : 0))}%` }}></div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500">SEO Score</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
