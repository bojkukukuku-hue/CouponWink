
import React, { useState, useRef, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [settings, setSettings] = useState({
    siteName: "CouponWink",
    supportEmail: "support@couponwink.com",
    logoUrl: null as string | null,
    metaTitle: "CouponWink - Verified AI & Hosting Promo Codes Daily",
    metaDescription: "Save money on the best AI tools and hosting services.",
    metaKeywords: "ai tools, hosting, saas deals",
    showSaleBanner: true,
    saleBannerText: "Flash Sale: Get an extra 10% off this week!",
    saleBannerLink: "/search",
  });

  useEffect(() => {
    const saved = MockDB.getSettings();
    if (saved) {
      setSettings(prev => ({ ...prev, ...saved }));
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    MockDB.saveSettings(settings);
    alert("Settings saved successfully and applied globally!");
  };

  const tabs = ['General', 'SEO', 'Homepage'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">System Configuration</h1>
          <p className="text-slate-500 font-medium mt-1">Global parameters and brand assets.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary-500 hover:bg-primary-600 text-slate-900 px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary-500/20 active:scale-95 transition"
        >
          Save All Changes
        </button>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1 w-full md:w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
        {activeTab === 'General' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo</label>
                <div className="size-32 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 flex items-center justify-center overflow-hidden relative group">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-4" />
                  ) : (
                    <span className="material-icons-round text-4xl text-primary-500">local_offer</span>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                     <button onClick={() => logoInputRef.current?.click()} className="text-white font-black text-[10px] uppercase tracking-widest bg-primary-500 px-3 py-2 rounded-lg">Change</button>
                  </div>
                </div>
                <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </div>
              <div className="flex-grow space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Name</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.supportEmail} onChange={e => setSettings({...settings, supportEmail: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SEO' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Title</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.metaTitle} onChange={e => setSettings({...settings, metaTitle: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
              <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-medium h-24 resize-none" value={settings.metaDescription} onChange={e => setSettings({...settings, metaDescription: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Keywords</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-bold" value={settings.metaKeywords} onChange={e => setSettings({...settings, metaKeywords: e.target.value})} />
            </div>
          </div>
        )}

        {activeTab === 'Homepage' && (
          <div className="space-y-8 animate-in fade-in">
             <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div>
                   <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Flash Sale Banner</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toggle visibility on the homepage</p>
                </div>
                <input type="checkbox" checked={settings.showSaleBanner} onChange={e => setSettings({...settings, showSaleBanner: e.target.checked})} className="size-6 text-primary-500 rounded-lg cursor-pointer" />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banner Text</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.saleBannerText} onChange={e => setSettings({...settings, saleBannerText: e.target.value})} disabled={!settings.showSaleBanner} />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banner Link</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-mono font-medium" value={settings.saleBannerLink} onChange={e => setSettings({...settings, saleBannerLink: e.target.value})} disabled={!settings.showSaleBanner} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
