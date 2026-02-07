
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: "Active Coupons", value: "842", trend: "+12", icon: "confirmation_number", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Total Views", value: "48.2k", trend: "+2.4k", icon: "visibility", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Conversion Rate", value: "14.5%", trend: "+0.8%", icon: "ads_click", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Estimated Revenue", value: "$4,290", trend: "+$420", icon: "payments", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
  ];

  const quickActions = [
    { label: "New Coupon", icon: "add_circle", path: "/admin/coupons/new", color: "bg-primary-500" },
    { label: "Add Partner", icon: "store", path: "/admin/stores", color: "bg-blue-500" },
    { label: "New Post", icon: "article", path: "/admin/editor", color: "bg-purple-500" },
    { label: "Users", icon: "people", path: "/admin/users", color: "bg-slate-800" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Good morning, Jane! Here's a summary of today's activity.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition shadow-sm">
             Export Report
           </button>
           <button className="px-6 py-3 rounded-xl bg-primary-500 text-slate-900 text-sm font-black hover:bg-primary-600 transition shadow-lg shadow-primary-500/20">
             Live Site Settings
           </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary-500/30 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className={`size-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                   <span className="material-icons-round text-3xl">{stat.icon}</span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                   <span className="material-icons-round text-xs">trending_up</span> {stat.trend}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">since last month</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Quick Management</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                 {quickActions.map((action, i) => (
                   <Link key={i} to={action.path} className="flex flex-col items-center gap-4 group">
                      <div className={`size-16 rounded-2xl ${action.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                         <span className="material-icons-round text-3xl">{action.icon}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest text-center">{action.label}</span>
                   </Link>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-2xl p-10 text-white relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                 <div>
                    <h3 className="text-2xl font-black mb-2 font-display">Optimization Tips</h3>
                    <p className="text-slate-400 font-medium max-w-md">"AI Tools" category is receiving the most views. Adding 3-5 new codes could increase conversion by 22%.</p>
                 </div>
                 <button className="shrink-0 bg-white text-slate-900 px-8 py-4 rounded-xl font-black text-sm hover:bg-primary-500 hover:text-white transition shadow-xl shadow-white/5 active:scale-95">
                    View Trends
                 </button>
              </div>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-10">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Activity Log</h3>
              <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:underline">See all</button>
           </div>
           <div className="space-y-8">
             {[
               { user: "Jane Admin", action: "Updated", target: "Jasper AI Coupon", time: "2 mins ago", type: "update" },
               { user: "System", action: "Expired", target: "Hostinger Flash Deal", time: "45 mins ago", type: "system" },
               { user: "Jane Admin", action: "Created", target: "Cloudways Black Friday", time: "1 hour ago", type: "create" },
               { user: "Mark Mod", action: "Banned", target: "User ID #4920", time: "3 hours ago", type: "alert" },
             ].map((log, i) => (
               <div key={i} className="flex gap-4 group">
                  <div className={`shrink-0 size-2 rounded-full mt-1.5 ${
                    log.type === 'create' ? 'bg-emerald-500' : 
                    log.type === 'update' ? 'bg-blue-500' :
                    log.type === 'alert' ? 'bg-red-500' : 'bg-slate-300'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                      {log.user} <span className="text-slate-400 font-bold">{log.action}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">{log.target}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">{log.time}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
