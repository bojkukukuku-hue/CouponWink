
import React, { useState, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  visible: boolean;
  order: number;
}

const AdminMenuManagement: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<Partial<MenuItem> | null>(null);

  useEffect(() => {
    setMenus(MockDB.getMenus());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMenu || !currentMenu.label) return;

    let newMenus = [...menus];
    if (currentMenu.id) {
      const idx = newMenus.findIndex(m => m.id === currentMenu.id);
      newMenus[idx] = currentMenu as MenuItem;
    } else {
      const newItem = {
        ...currentMenu,
        id: Date.now().toString(),
        order: menus.length + 1
      } as MenuItem;
      newMenus.push(newItem);
    }

    setMenus(newMenus);
    MockDB.saveMenus(newMenus);
    setModalOpen(false);
  };

  const deleteMenu = (id: string) => {
    if (window.confirm('Xoá mục menu này?')) {
      const newMenus = menus.filter(m => m.id !== id);
      setMenus(newMenus);
      MockDB.saveMenus(newMenus);
    }
  };

  const toggleVisible = (id: string) => {
    const newMenus = menus.map(m => m.id === id ? { ...m, visible: !m.visible } : m);
    setMenus(newMenus);
    MockDB.saveMenus(newMenus);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Quản lý Menu</h1>
          <p className="text-slate-500 font-medium mt-1">Sắp xếp và chỉnh sửa các liên kết trên thanh điều hướng chính.</p>
        </div>
        <button 
          onClick={() => { setCurrentMenu({ label: '', path: '/', visible: true }); setModalOpen(true); }}
          className="bg-primary-500 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95"
        >
          <span className="material-icons-round">add_link</span>
          Thêm Menu
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {menus.map((item, idx) => (
            <div key={item.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
              <div className="flex items-center gap-6 flex-1">
                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                   <span className="material-icons-round">drag_indicator</span>
                </div>
                <div className="flex flex-col">
                   <span className="font-black text-lg text-slate-900 dark:text-white">{item.label}</span>
                   <span className="text-xs font-mono text-slate-400">{item.path}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                    onClick={() => toggleVisible(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${item.visible ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                 >
                    <span className="material-icons-round text-sm">{item.visible ? 'visibility' : 'visibility_off'}</span>
                    {item.visible ? 'Đang hiện' : 'Đã ẩn'}
                 </button>
                 <div className="flex gap-2">
                    <button onClick={() => { setCurrentMenu(item); setModalOpen(true); }} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-500 transition"><span className="material-icons-round text-lg">edit</span></button>
                    <button onClick={() => deleteMenu(item.id)} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition"><span className="material-icons-round text-lg">delete</span></button>
                 </div>
              </div>
            </div>
          ))}
          {menus.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold">Chưa có mục menu nào.</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 font-display">Cài đặt liên kết</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nhãn hiển thị</label>
                <input required className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 font-black text-lg border-0 focus:ring-2 focus:ring-primary-500" value={currentMenu?.label} onChange={e => setCurrentMenu({...currentMenu, label: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Đường dẫn URL</label>
                <input required className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 font-mono font-bold border-0 focus:ring-2 focus:ring-primary-500" value={currentMenu?.path} onChange={e => setCurrentMenu({...currentMenu, path: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 rounded-xl font-black text-[10px] uppercase text-slate-500 bg-slate-50 dark:bg-slate-800">Hủy</button>
                <button type="submit" className="px-10 py-4 rounded-xl font-black text-[10px] uppercase bg-primary-500 text-slate-900 shadow-xl shadow-primary-500/20">Lưu liên kết</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuManagement;
