
import React, { useState, useRef, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';
import BulkImport from '../../components/Admin/BulkImport';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  customImage?: string;
  useCustomImage: boolean;
  storeCount: number;
  description: string;
}

const AdminCategoryManagement: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCat, setCurrentCat] = useState<Partial<CategoryItem> | null>(null);

  useEffect(() => {
    setCategories(MockDB.getCategories());
    setCoupons(MockDB.getCoupons());
    setStores(MockDB.getStores());
  }, []);

  const handleBulkImport = async (data: any[]) => {
    const catsToSave = data.map(item => ({
      id: item.id || item.name?.toLowerCase().replace(/\s+/g, '-'),
      name: item.name || '',
      icon: item.icon || 'category',
      useCustomImage: !!item.customImage,
      customImage: item.customImage || '',
      description: item.description || '',
      storeCount: 0
    }));

    for (const cat of catsToSave) {
      if (cat.name) await MockDB.saveCategory(cat as any);
    }
    setCategories(MockDB.getCategories());
    alert(`Đã nhập thành công ${catsToSave.length} danh mục!`);
  };

  const getActiveCouponCount = (catName: string) => {
    const storesInCategory = stores.filter((s: any) => s.category === catName);
    const storeIds = storesInCategory.map((s: any) => s.id);
    return coupons.filter(c => storeIds.includes(c.storeId) && c.status === 'Active').length;
  };

  const handleEdit = (cat: CategoryItem) => {
    setCurrentCat({ ...cat });
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentCat({ name: '', icon: 'category', useCustomImage: false, description: '', storeCount: 0 });
    setModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCat(prev => ({ 
          ...prev, 
          customImage: reader.result as string,
          useCustomImage: true 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCat || !currentCat.name) return;
    
    await MockDB.saveCategory(currentCat);
    setCategories(MockDB.getCategories());
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Xóa danh mục này?')) {
      await MockDB.deleteCategory(id);
      setCategories(MockDB.getCategories());
    }
  };

  const commonIcons = ['psychology', 'cloud', 'dns', 'article', 'edit', 'palette', 'trending_up', 'design_services', 'featured_play_list', 'smart_toy', 'language', 'brush', 'campaign', 'assignment_turned_in'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Danh mục hệ thống</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý các nhóm sản phẩm và theo dõi số lượng ưu đãi.</p>
        </div>
        <div className="flex gap-3">
          <BulkImport 
            title="danh mục" 
            fields={['name', 'description', 'icon']} 
            onImport={handleBulkImport} 
          />
          <button 
            onClick={handleAdd}
            className="bg-primary-500 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95"
          >
            <span className="material-icons-round">add_circle</span>
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary-500 transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="size-20 rounded-3xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center shadow-inner overflow-hidden border border-primary-100 dark:border-primary-900/30">
                {cat.useCustomImage && cat.customImage ? (
                  <img src={cat.customImage} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-icons-round text-4xl">{cat.icon || 'category'}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(cat)} className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary-500 transition flex items-center justify-center"><span className="material-icons-round text-xl">edit</span></button>
                <button onClick={() => handleDelete(cat.id)} className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition flex items-center justify-center"><span className="material-icons-round text-xl">delete</span></button>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-display">{cat.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">{cat.description}</p>
            <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">Active Deals: {getActiveCouponCount(cat.name)}</span>
               <span className="text-slate-400">Stores: {stores.filter((s:any) => s.category === cat.name).length}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 font-display">Cài đặt danh mục</h2>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="size-32 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 mx-auto overflow-hidden shadow-inner">
                    {currentCat?.useCustomImage && currentCat?.customImage ? (
                      <img src={currentCat.customImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-icons-round text-6xl text-primary-500">{currentCat?.icon}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
                       <span className="material-icons-round text-sm">upload</span> Tải Icon tùy chỉnh
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    {currentCat?.useCustomImage && (
                      <button type="button" onClick={() => setCurrentCat({...currentCat, useCustomImage: false})} className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline">Dùng lại Icon mặc định</button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Tên danh mục</label>
                    <input required className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black text-lg" value={currentCat?.name} onChange={e => setCurrentCat({...currentCat, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Hoặc chọn Icon mặc định</label>
                    <div className="grid grid-cols-5 gap-2 h-32 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/30 rounded-2xl no-scrollbar border border-slate-100 dark:border-slate-800">
                      {commonIcons.map(icon => (
                        <button key={icon} type="button" onClick={() => setCurrentCat({...currentCat, icon, useCustomImage: false})} className={`size-10 rounded-xl flex items-center justify-center transition-all ${currentCat?.icon === icon && !currentCat?.useCustomImage ? 'bg-primary-500 text-white shadow-lg' : 'bg-white dark:bg-slate-700 text-slate-400 hover:bg-slate-50'}`}><span className="material-icons-round text-xl">{icon}</span></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Mô tả ngắn</label>
                <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-medium h-24 resize-none" value={currentCat?.description} onChange={e => setCurrentCat({...currentCat, description: e.target.value})} />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-black uppercase tracking-widest text-[10px]">Hủy</button>
                <button type="submit" className="flex-1 py-5 rounded-2xl bg-primary-500 text-slate-900 font-black uppercase tracking-widest text-[10px] px-10 shadow-xl shadow-primary-500/20">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryManagement;
