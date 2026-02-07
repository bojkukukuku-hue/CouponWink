
import React, { useState, useRef, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';

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

  const handleEdit = (store: StoreItem) => {
    setCurrentStore({ ...store });
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentStore({ 
      id: '', 
      name: '', 
      category: categories[0]?.name || 'AI Writing Tools', 
      logo: 'storefront', 
      useCustomImage: false, 
      color: 'text-primary-500', 
      rating: 4.5, 
      deals: 0, 
      status: 'Active',
      description: '',
      website: ''
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

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      MockDB.deleteStore(id);
      setStores(MockDB.getStores());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStore || !currentStore.name) return;

    const storeData = {
      ...currentStore,
      id: currentStore.id || currentStore.name.toLowerCase().replace(/\s+/g, '-'),
    } as StoreItem;

    MockDB.saveStore(storeData);
    setStores(MockDB.getStores());
    setModalOpen(false);
  };

  const commonIcons = ['psychology', 'cloud', 'dns', 'article', 'edit', 'palette', 'trending_up', 'design_services', 'featured_play_list', 'smart_toy', 'rocket_launch', 'memory'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Partner Stores</h1>
          <p className="text-slate-500 font-medium">Manage brands, logos, and rating information.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary-500 hover:bg-primary-600 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95"
        >
          <span className="material-icons-round">add_business</span>
          Add Store
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brand</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category & Rating</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
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
                        <span className="block font-black font-display text-lg truncate">{store.name}</span>
                        <span className="block text-xs text-slate-400 font-medium truncate max-w-[200px]">{store.website}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <div className="space-y-1.5">
                      <span className="inline-block text-[10px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-widest">{store.category}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <span className="material-icons-round text-sm">star</span>
                        <span className="text-sm font-black">{store.rating}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-2">
                       <div className={`size-2.5 rounded-full ${store.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                       <span className="text-sm font-black text-slate-700 dark:text-slate-300">{store.status}</span>
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
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 font-display">Store Settings</h2>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <div className="size-32 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 mx-auto overflow-hidden">
                      {currentStore?.useCustomImage && currentStore?.customImage ? (
                        <img src={currentStore.customImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-icons-round text-6xl text-primary-500">{currentStore?.logo}</span>
                      )}
                   </div>
                   <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">Upload Image</button>
                   <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                   <div className="grid grid-cols-6 gap-2">
                     {commonIcons.map(icon => (
                       <button type="button" key={icon} onClick={() => setCurrentStore({...currentStore, logo: icon, useCustomImage: false})} className={`size-10 rounded-xl border flex items-center justify-center ${currentStore?.logo === icon && !currentStore?.useCustomImage ? 'border-primary-500 text-primary-500' : 'border-slate-200 text-slate-400'}`}><span className="material-icons-round">{icon}</span></button>
                     ))}
                   </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                    <input required className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-black border-0" value={currentStore?.name} onChange={e => setCurrentStore({...currentStore, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website</label>
                    <input className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-bold border-0" value={currentStore?.website} onChange={e => setCurrentStore({...currentStore, website: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-bold border-0" value={currentStore?.category} onChange={e => setCurrentStore({...currentStore, category: e.target.value})}>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</label>
                    <input type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-black border-0" value={currentStore?.rating} onChange={e => setCurrentStore({...currentStore, rating: parseFloat(e.target.value)})} />
                  </div>
                </div>
              </div>
              <textarea className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-medium h-24 border-0" placeholder="Store Description" value={currentStore?.description} onChange={e => setCurrentStore({...currentStore, description: e.target.value})} />
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500">Cancel</button>
                <button type="submit" className="px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest bg-primary-500 text-slate-900">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoreManagement;
