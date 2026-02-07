
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const AdminAnalytics: React.FC = () => {
  const chartData = [
    { name: 'Oct 1', clicks: 4000, conv: 240 },
    { name: 'Oct 7', clicks: 6000, conv: 398 },
    { name: 'Oct 14', clicks: 8000, conv: 580 },
    { name: 'Oct 21', clicks: 12000, conv: 890 },
    { name: 'Oct 28', clicks: 15000, conv: 1100 },
  ];

  const pieData = [
    { name: 'AI Writing', value: 45, color: '#10b981' },
    { name: 'Hosting', value: 25, color: '#3b82f6' },
    { name: 'Design', value: 15, color: '#a855f7' },
    { name: 'VPN', value: 15, color: '#f59e0b' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-display">Analytics & Reports</h1>
        <p className="text-slate-500 font-medium">Monitor site performance, revenue, and traffic sources.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Clicks", value: "124,592", trend: "+5.2%", color: "emerald" },
          { label: "Conversion Rate", value: "4.8%", trend: "+0.2%", color: "blue" },
          { label: "Top Store", value: "Jasper AI", trend: "12k clicks", color: "purple" },
          { label: "Est. Revenue", value: "$14,200", trend: "+12%", color: "orange" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black mb-2">{kpi.value}</h3>
            <span className="text-xs font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">{kpi.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black mb-8 font-display">Performance Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-xl font-black mb-8 font-display">Clicks by Category</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Clicks</p>
              <p className="text-3xl font-black">124k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
