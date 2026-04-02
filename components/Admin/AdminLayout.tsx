
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const currentUser = MockDB.getCurrentUser();
  
  const menuGroups = [
    {
      title: "Hệ thống",
      items: [
        { label: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
        { label: "Thống kê", icon: "insights", path: "/admin/analytics" },
      ]
    },
    {
      title: "Nội dung chính",
      items: [
        { label: "Cửa hàng", icon: "storefront", path: "/admin/stores" },
        { label: "Danh mục", icon: "category", path: "/admin/categories" },
        { label: "Mã giảm giá", icon: "confirmation_number", path: "/admin/coupons" },
        { label: "Bài viết Blog", icon: "edit_note", path: "/admin/posts" },
        { label: "Quản lý Menu", icon: "menu", path: "/admin/menu" },
      ]
    },
    {
      title: "Cấu hình",
      items: [
        { label: "Người dùng", icon: "manage_accounts", path: "/admin/users" },
        { label: "Cài đặt chung", icon: "settings", path: "/admin/settings" },
        { label: "Media Library", icon: "perm_media", path: "/admin/media" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      <aside className="w-72 flex-shrink-0 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl bg-primary-500 flex items-center justify-center text-slate-900 shadow-lg shadow-primary-500/20 group-hover:rotate-12 transition-transform">
              <span className="material-icons-round">local_offer</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">WinkAdmin</h1>
              <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mt-1">v2.5 Pro</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link 
                    key={item.label}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                      location.pathname.startsWith(item.path) 
                        ? 'bg-primary-500 text-slate-900 shadow-lg shadow-primary-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="material-icons-round text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 px-2">
             <div className="size-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${currentUser?.username || 'Admin'}&background=10b981&color=fff`} alt="Admin" className="w-full h-full object-cover" />
             </div>
             <div className="flex-grow min-w-0">
                <p className="text-sm font-black truncate">{currentUser?.username || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{currentUser?.role || 'Admin'}</p>
             </div>
             <button 
                onClick={() => MockDB.logout()}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Đăng xuất"
              >
                <span className="material-icons-round text-xl">logout</span>
             </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Admin</span>
                <span className="material-icons-round text-sm">chevron_right</span>
                <span className="text-slate-900 dark:text-white">{location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative hidden md:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 text-sm">search</span>
                <input className="bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 rounded-xl border-0 text-[10px] font-bold w-64 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Tìm kiếm nhanh..." />
             </div>
             <button className="size-10 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center relative">
                <span className="material-icons-round">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50 dark:bg-slate-950 p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
