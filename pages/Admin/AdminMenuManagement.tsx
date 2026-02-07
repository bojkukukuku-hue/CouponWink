
import React from 'react';

const AdminMenuManagement: React.FC = () => {
  const menuItems = [
    { label: "Home", path: "/", visible: true },
    { label: "Categories", path: "/categories", visible: true },
    { label: "Stores", path: "/search", visible: true },
    { label: "Blog", path: "/blog", visible: true },
    { label: "Submit Deal", path: "/submit-deal", visible: true },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-display">Menu Management</h1>
          <p className="text-slate-500 font-medium">Customize the main navigation and footer menus.</p>
        </div>
        <button className="bg-primary-500 text-slate-900 px-6 py-3 rounded-xl font-black text-sm">Add Menu Item</button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Navigation Order</span>
           <span className="text-xs font-black text-primary-500">Live on Site</span>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {menuItems.map((item, i) => (
            <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
               <div className="flex items-center gap-4">
                  <span className="material-icons-round text-slate-300 cursor-move">drag_indicator</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-slate-400 font-mono">{item.path}</p>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-5 bg-primary-500 rounded-full relative">
                       <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Visible</span>
                  </div>
                  <button className="text-slate-400 hover:text-red-500">
                    <span className="material-icons-round">delete_outline</span>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenuManagement;
