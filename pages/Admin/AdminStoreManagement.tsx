
import React, { useState, useRef, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';
import BulkImport from '../../components/Admin/BulkImport';

interface StoreItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  customImage?: string;
  useCustomImage: boolean;
  color: string;
  rating: number;
  deals: number;
  status: 'Active' | 'Inactive';
  description: string;
  website: string;
  featured?: boolean;
  clicks?: number;
  createdAt?: string;
}

const AdminStoreManagement: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Partial<StoreItem> | null>(null);

  useEffect(() => {
    setStores(MockDB.getStores());
    setCategories(MockDB.getCategories());
  }, []);

  const handleBulkImport = async (data: any[]) => {
    const storesToSave = data.map(item => ({
      id: item.id || item.name?.toLowerCase().replace(/\s+/g, '-'),
      name: item.name || '',
      category: item.category || categories[0]?.name || 'AI Writing',
      logo: item.logo || 'storefront',
      useCustomImage: !!item.customImage,
      customImage: item.customImage || '',
      color: item.color || 'text-primary-500',
      rating: item.rating || 4.5,
      deals: item.deals || 0,
      status: item.status || 'Active',
      description: item.description || '',
      website: item.website || '',
      featured: !!item.featured,
      clicks: item.clicks || 0
    }));

    for (const store of storesToSave) {
      if (store.name) await MockDB.saveStore(store as any);
    }
    setStores(MockDB.getStores());
    alert(`Đã nhập thành công ${storesToSave.length} cửa hàng!`);
  };

  const handleEdit = (store: StoreItem) => {
    setCurrentStore({ ...store });
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentStore({ 
      id: '', 
      name: '', 
      category: categories[0]?.name || 'AI Writing', 
      logo: 'storefront', 
      useCustomImage: false, 
      color: 'text-primary-500', 
      rating: 4.5, 
      deals: 0, 
      status: 'Active',
      description: '',
      website: '',
      featured: false,
      clicks: 0
    });
    setModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentStore(prev => ({ 
          ...prev, 
          customImage: reader.result as string,
          useCustomImage: true 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cửa hàng này?')) {
      await MockDB.deleteStore(id);
      setStores(MockDB.getStores());
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStore || !currentStore.name) return;

    const rating = Math.min(5, Math.max(0, currentStore.rating || 0));

    const storeData = {
      ...currentStore,
      rating: rating,
      id: currentStore.id || currentStore.name.toLowerCase().replace(/\s+/g, '-'),
    } as StoreItem;

    await MockDB.saveStore(storeData);
    setStores(MockDB.getStores());
    setModalOpen(false);
  };

  const commonIcons = ['psychology', 'cloud', 'dns', 'article', 'edit', 'palette', 'trending_up', 'design_services', 'featured_play_list', 'smart_toy', 'rocket_launch', 'memory'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Đối tác cửa hàng</h1>
          <p className="text-slate-500 font-medium">Quản lý thương hiệu, logo và thông tin đánh giá.</p>
        </div>
        <div className="flex gap-3">
          <BulkImport 
            title="cửa hàng" 
            fields={['name', 'category', 'description', 'website', 'logo', 'rating', 'featured', 'status']} 
            onImport={handleBulkImport} 
          />
          <button 
            onClick={handleAdd}
            className="bg-primary-500 hover:bg-primary-600 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95"
          >
            <span className="material-icons-round">add_business</span>
            Thêm cửa hàng
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Thương hiệu</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Danh mục & Đánh giá</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Trạng thái</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="py-6 px-10 text-slate-900 dark:text-white">
                    <div className="flex items-center gap-5">
                      <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner shrink-0 overflow-hidden">
                        {store.useCustomImage && store.customImage ? (
                          <img src={store.customImage} alt={store.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className={`material-icons-round text-3xl ${store.color || 'text-primary-500'}`}>{store.logo || 'storefront'}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="block font-black font-display text-lg truncate">{store.name}</span>
                          {store.featured && (
                            <span className="material-icons-round text-amber-500 text-sm" title="Featured Store">stars</span>
                          )}
                        </div>
                        <span className="block text-xs text-slate-400 font-medium truncate max-w-[200px]">{store.website}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <div className="space-y-1.5">
                      <span className="inline-block text-[10px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-widest">{store.category}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center justify-center size-6 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                          <span className="material-icons-round text-amber-500 text-base animate-pulse">star</span>
                        </div>
                        <span className="text-sm font-black text-slate-900 dark:text-white">{store.rating} <span className="text-slate-400 font-medium">/ 5</span></span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-2">
                       <div className={`size-2.5 rounded-full ${store.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></div>
                       <span className="text-sm font-black text-slate-700 dark:text-slate-300">{store.status === 'Active' ? 'Đang hoạt động' : 'Tạm dừng'}</span>
                    </div>
                  </td>
                  <td className="py-6 px-10 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEdit(store)} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-500 transition"><span className="material-icons-round text-xl">edit</span></button>
                      <button onClick={() => handleDelete(store.id)} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition"><span className="material-icons-round text-xl">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-3xl p-10 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
            <button onClick={() => setModalOpen(false)} className="absolute top-8 right-8 size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 transition"><span className="material-icons-round">close</span></button>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 font-display">Cài đặt cửa hàng</h2>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <div className="size-32 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 mx-auto overflow-hidden shadow-inner">
                      {currentStore?.useCustomImage && currentStore?.customImage ? (
                        <img src={currentStore.customImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-icons-round text-6xl text-primary-500">{currentStore?.logo}</span>
                      )}
                   </div>
                   <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">Tải ảnh logo</button>
                   <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                   <div className="grid grid-cols-6 gap-2">
                     {commonIcons.map(icon => (
                       <button type="button" key={icon} onClick={() => setCurrentStore({...currentStore, logo: icon, useCustomImage: false})} className={`size-10 rounded-xl border flex items-center justify-center transition-all ${currentStore?.logo === icon && !currentStore?.useCustomImage ? 'border-primary-500 text-primary-500 bg-primary-50' : 'border-slate-200 text-slate-400 hover:bg-slate-50'}`}><span className="material-icons-round text-base">{icon}</span></button>
                     ))}
                   </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tên cửa hàng</label>
                    <input required className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-black border-0 focus:ring-2 focus:ring-primary-500" value={currentStore?.name} onChange={e => setCurrentStore({...currentStore, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website URL</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-bold border-0 focus:ring-2 focus:ring-primary-500" value={currentStore?.website} onChange={e => setCurrentStore({...currentStore, website: e.target.value})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="material-icons-round text-amber-500">stars</span>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cửa hàng nổi bật</label>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={currentStore?.featured} 
                      onChange={e => setCurrentStore({...currentStore, featured: e.target.checked})} 
                      className="size-6 text-primary-500 rounded-lg cursor-pointer" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Danh mục chính</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-bold border-0 focus:ring-2 focus:ring-primary-500 appearance-none" value={currentStore?.category} onChange={e => setCurrentStore({...currentStore, category: e.target.value})}>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Điểm đánh giá (0-5)</label>
                      <span className="text-[10px] font-black text-amber-500">⭐ {currentStore?.rating || 0}/5</span>
                    </div>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      max="5"
                      className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-black border-0 focus:ring-2 focus:ring-primary-500" 
                      value={currentStore?.rating} 
                      onChange={e => setCurrentStore({...currentStore, rating: parseFloat(e.target.value)})} 
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mô tả giới thiệu cửa hàng</label>
                <textarea className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-medium h-28 border-0 focus:ring-2 focus:ring-primary-500 mt-2 resize-none" placeholder="Viết vài câu giới thiệu về đối tác..." value={currentStore?.description} onChange={e => setCurrentStore({...currentStore, description: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500">Hủy</button>
                <button type="submit" className="px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest bg-primary-500 text-slate-900 shadow-xl shadow-primary-500/20">Lưu cửa hàng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoreManagement;
