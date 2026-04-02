
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';
import BulkImport from '../../components/Admin/BulkImport';

interface CouponItem {
  id: string;
  storeId: string;
  title: string;
  code: string;
  type: 'Code' | 'Deal' | 'Trial';
  status: 'Active' | 'Expired' | 'Draft';
  usage: number;
  expiry: string;
  desc?: string;
  link?: string;
  label?: string;
}

const AdminCouponManagement: React.FC = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponItem[]>([]);

  useEffect(() => {
    setCoupons(MockDB.getCoupons());
  }, []);

  const handleBulkImport = async (data: any[]) => {
    const couponsToSave = data.map(item => ({
      id: item.id || 'c-' + Math.random().toString(36).substr(2, 9),
      storeId: item.storeId || '',
      title: item.title || '',
      code: item.code || '',
      type: item.type || (item.code ? 'Code' : 'Deal'),
      status: item.status || 'Active',
      usage: item.usage || 0,
      expiry: item.expiry || '2025-12-31',
      desc: item.description || '',
      link: item.link || '',
      label: item.label || (item.code ? 'PROMO CODE' : 'GET DEAL')
    }));

    for (const coupon of couponsToSave) {
      if (coupon.title && coupon.storeId) await MockDB.saveCoupon(coupon as any);
    }
    setCoupons(MockDB.getCoupons());
    alert(`Đã nhập thành công ${couponsToSave.length} mã giảm giá!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this coupon? Users will no longer be able to see it.')) {
      MockDB.deleteCoupon(id);
      setCoupons(MockDB.getCoupons());
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Promo Codes</h1>
          <p className="text-slate-500 font-medium">Manage promotional campaigns and discount codes from partners.</p>
        </div>
        <div className="flex gap-3">
          <BulkImport 
            title="mã giảm giá" 
            fields={['storeId', 'title', 'code', 'type', 'status', 'usage', 'expiry', 'description', 'link', 'label']} 
            onImport={handleBulkImport} 
          />
          <Link to="/admin/coupons/new" className="bg-primary-500 hover:bg-primary-600 text-slate-900 font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-primary-500/20 flex items-center gap-3 active:scale-95">
            <span className="material-icons-round">add_circle</span>
            Create New Coupon
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Coupon & Store</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Performance</th>
                <th className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="py-6 px-10 text-slate-900 dark:text-white">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white font-display">{coupon.title}</span>
                      <span className="text-xs text-primary-500 font-bold uppercase tracking-widest mt-1">{coupon.storeId} • {coupon.code}</span>
                    </div>
                  </td>
                  <td className="py-6 px-10">
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-widest">{coupon.type}</span>
                  </td>
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-2">
                       <div className={`size-2.5 rounded-full ${coupon.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : coupon.status === 'Expired' ? 'bg-red-500' : 'bg-slate-400'}`}></div>
                       <span className="text-sm font-black text-slate-700 dark:text-slate-300">{coupon.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold ml-4.5 mt-0.5">Expires: {coupon.expiry}</p>
                  </td>
                  <td className="py-6 px-10">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white">{coupon.usage?.toLocaleString()}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Uses</span>
                    </div>
                  </td>
                  <td className="py-6 px-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/coupons/edit/${coupon.id}`)} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-500 transition shadow-sm">
                        <span className="material-icons-round text-lg">edit</span>
                      </button>
                      <button onClick={() => handleDelete(coupon.id)} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition shadow-sm">
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

export default AdminCouponManagement;
