
import React, { useState } from 'react';

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com", role: "Super Admin", status: "Active", joined: "Oct 24, 2023", lastActive: "2 mins ago" },
    { id: 2, name: "Cody Fisher", email: "cody.fisher@example.com", role: "Editor", status: "Active", joined: "Sep 12, 2023", lastActive: "1 day ago" },
    { id: 3, name: "Esther Howard", email: "esther.howard@example.com", role: "Subscriber", status: "Banned", joined: "Aug 04, 2023", lastActive: "Last month" },
    { id: 4, name: "Cameron Williamson", email: "cameron.w@example.com", role: "Moderator", status: "Inactive", joined: "Nov 01, 2023", lastActive: "5 mins ago" },
    { id: 5, name: "Lindsay Walton", email: "lindsay.walton@example.com", role: "Subscriber", status: "Active", joined: "Oct 18, 2023", lastActive: "3 hours ago" },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm('Xoá người dùng này vĩnh viễn? Hành động này không thể hoàn tác.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const toggleBan = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Banned' ? 'Active' : 'Banned';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">Danh sách người dùng</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý phân quyền, theo dõi hoạt động và bảo mật tài khoản.</p>
        </div>
        <button className="bg-primary-500 hover:bg-primary-600 text-slate-900 font-black px-8 py-4 rounded-2xl transition flex items-center gap-3 shadow-xl shadow-primary-500/20 active:scale-95">
          <span className="material-icons-round">person_add</span> Mời Quản trị viên
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div className="relative flex-1 max-w-md w-full">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400">search</span>
             <input className="w-full bg-slate-50 dark:bg-slate-800 pl-12 pr-4 py-4 rounded-2xl border-0 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Tìm kiếm tên, email hoặc ID..." />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                <th className="py-6 px-10">Tài khoản</th>
                <th className="py-6 px-10">Vai trò</th>
                <th className="py-6 px-10">Trạng thái</th>
                <th className="py-6 px-10 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors group">
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-5">
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-black text-slate-400 group-hover:scale-110 transition-transform">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-base font-display">{user.name}</p>
                        <p className="text-xs text-slate-400 font-bold">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      user.role === 'Super Admin' ? 'bg-primary-50 text-primary-600 border-primary-200' :
                      user.role === 'Editor' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      'bg-slate-50 text-slate-600 border-slate-200'
                    } dark:bg-opacity-10`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-2">
                       <div className={`size-2.5 rounded-full ${
                         user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                         user.status === 'Banned' ? 'bg-red-500' : 'bg-amber-500'
                       }`}></div>
                       <span className="text-sm font-black text-slate-700 dark:text-slate-300">{user.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold ml-4.5 mt-0.5">{user.lastActive}</p>
                  </td>
                  <td className="py-6 px-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => toggleBan(user.id)}
                        className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 transition ${user.status === 'Banned' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                        title={user.status === 'Banned' ? 'Mở khoá' : 'Khoá tài khoản'}
                      >
                        <span className="material-icons-round text-lg">{user.status === 'Banned' ? 'check_circle' : 'block'}</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <span className="material-icons-round text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
