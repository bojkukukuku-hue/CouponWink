
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';

const AdminCouponCreator: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stores, setStores] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    storeId: '',
    type: 'Code' as 'Code' | 'Deal' | 'Trial',
    label: '',
    code: '',
    link: '',
    desc: '',
    title: '',
    expiry: '',
    status: 'Active',
    usage: 0
  });

  useEffect(() => {
    const allStores = MockDB.getStores();
    setStores(allStores);
    
    if (id) {
      const coupon = MockDB.getCoupons().find((c: any) => c.id === id);
      if (coupon) {
        setFormData(coupon);
      }
    } else if (allStores.length > 0) {
      setFormData(prev => ({ ...prev, storeId: allStores[0].id }));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = () => {
    if (!formData.storeId || !formData.title || !formData.label) {
      alert("Please fill in required fields: Store, Title, and Label.");
      return;
    }
    MockDB.saveCoupon(formData);
    alert(id ? 'Coupon updated successfully!' : 'New coupon created successfully!');
    navigate('/admin/coupons');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">
            {id ? 'Edit Coupon' : 'New Coupon Campaign'}
          </h1>
          <p className="text-slate-500 font-medium mt-1">Design and publish coupons. Partner links open when revealed.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/coupons')} className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-black text-slate-500 hover:text-red-500 transition shadow-sm">Cancel</button>
          <button onClick={handlePublish} className="px-10 py-4 rounded-2xl bg-primary-500 text-slate-900 text-sm font-black hover:bg-primary-600 transition shadow-xl shadow-primary-500/20 active:scale-95">
            {id ? 'Update' : 'Publish Now'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-8">
           <form className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Target Store</label>
                  <select 
                    name="storeId"
                    value={formData.storeId}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-bold focus:ring-4 focus:ring-primary-500/10 outline-none appearance-none cursor-pointer"
                  >
                    {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Coupon Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-bold outline-none"
                  >
                    <option value="Code">Code</option>
                    <option value="Deal">Deal</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Title / Offer Heading</label>
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-black text-xl outline-none focus:ring-4 focus:ring-primary-500/10" 
                  placeholder="e.g. 7-Day Free Trial" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Discount Label</label>
                  <input 
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-black text-xl text-primary-500 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-primary-500/10" 
                    placeholder="e.g. 20% OFF" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Promo Code</label>
                  <input 
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-mono font-black text-xl tracking-[0.2em] placeholder:text-slate-300 uppercase outline-none focus:ring-4 focus:ring-primary-500/10" 
                    placeholder="SUMMER24" 
                    disabled={formData.type === 'Deal'}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Affiliate Link</label>
                <input 
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-bold text-primary-600 outline-none focus:ring-4 focus:ring-primary-500/10" 
                  placeholder="https://..." 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Offer Description</label>
                <textarea 
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-5 font-medium h-32 outline-none resize-none" 
                  placeholder="Explain benefits..."
                ></textarea>
              </div>
           </form>
        </div>

        <div className="lg:col-span-2">
           <div className="sticky top-10 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Live Preview</h3>
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="flex flex-col gap-6">
                   <div className="text-4xl font-black text-primary-500 mb-1 leading-none">{formData.label || "0% OFF"}</div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">{formData.title || "Offer Title"}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mt-2">{formData.desc || "Description text..."}</p>
                   </div>
                   <div className="relative flex bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-primary-200 rounded-2xl p-1.5">
                      <div className="flex-grow flex items-center justify-center font-mono font-black text-slate-400 tracking-[0.2em] px-4 text-sm uppercase">
                        {formData.type === 'Code' ? (formData.code ? formData.code.replace(/./g, '•') : '••••••••') : 'ACTIVATE DEAL'}
                      </div>
                      <button className="bg-primary-500 text-slate-900 font-black px-6 py-3.5 rounded-xl text-[10px] uppercase tracking-widest">Reveal</button>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponCreator;
