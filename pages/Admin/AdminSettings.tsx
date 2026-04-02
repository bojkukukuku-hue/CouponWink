
import React, { useState, useRef, useEffect } from 'react';
import { MockDB } from '../../services/mockDb';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  
  const [settings, setSettings] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = MockDB.getSettings();
    setSettings({ ...saved });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'faviconUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGroup = (group: string) => {
    MockDB.saveSettings(settings);
    setSaveStatus(prev => ({ ...prev, [group]: true }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [group]: false }));
    }, 2500);
  };

  const fonts = ["Plus Jakarta Sans", "Inter", "Roboto", "Montserrat", "Poppins", "Open Sans", "System UI"];
  const sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "40px", "48px", "64px", "80px"];

  const tabs = ['General', 'Homepage', 'Display', 'SEO', 'Branding', 'Typography', 'Database', 'Advanced'];

  if (!settings.siteName) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">Cấu hình Hệ thống</h1>
          <p className="text-slate-500 font-medium mt-1">Quản lý giao diện, typography, màu sắc và các thông số toàn cầu.</p>
        </div>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1 w-full md:w-fit overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeTab === tab ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm space-y-12">
        {activeTab === 'General' && (
          <div className="space-y-8 animate-in fade-in">
             <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Thông tin cơ bản</h3>
                <button onClick={() => handleSaveGroup('general')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.general ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.general ? 'Đã lưu' : 'Lưu thông tin'}
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên Website</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email hỗ trợ</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.supportEmail} onChange={e => setSettings({...settings, supportEmail: e.target.value})} />
                </div>
             </div>
             
             <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-6 border border-slate-100 dark:border-slate-700">
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Biểu ngữ Flash Sale</h3>
                <div className="flex items-center justify-between">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hiển thị Banner trên trang chủ</p>
                   <input type="checkbox" checked={settings.showSaleBanner} onChange={e => setSettings({...settings, showSaleBanner: e.target.checked})} className="size-6 text-primary-500 rounded-lg cursor-pointer" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nội dung text</label>
                      <input className="w-full bg-white dark:bg-slate-900 border-0 rounded-xl p-4 font-bold" value={settings.saleBannerText} onChange={e => setSettings({...settings, saleBannerText: e.target.value})} disabled={!settings.showSaleBanner} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Link liên kết</label>
                      <input className="w-full bg-white dark:bg-slate-900 border-0 rounded-xl p-4 font-mono text-xs" value={settings.saleBannerLink} onChange={e => setSettings({...settings, saleBannerLink: e.target.value})} disabled={!settings.showSaleBanner} />
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'Homepage' && (
          <div className="space-y-8 animate-in fade-in">
             <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Bố cục trang chủ</h3>
                <button onClick={() => handleSaveGroup('homepage')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.homepage ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.homepage ? 'Đã lưu' : 'Lưu cài đặt'}
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">trending_up</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trending Stores</label>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng hiển thị</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="24"
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                        value={settings.homepage?.trendingCount || 6} 
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, trendingCount: parseInt(e.target.value)}})} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sắp xếp theo</label>
                      <select 
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black appearance-none"
                        value={settings.homepage?.trendingSort || 'featured'}
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, trendingSort: e.target.value}})}
                      >
                        <option value="featured">Cửa hàng nổi bật (Manual)</option>
                        <option value="latest">Mới thêm gần đây</option>
                        <option value="clicks">Lượt click nhiều nhất</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">grid_view</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Browse Category</label>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng hiển thị</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="24"
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                        value={settings.homepage?.categoryCount || 8} 
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, categoryCount: parseInt(e.target.value)}})} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sắp xếp theo</label>
                      <select 
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black appearance-none"
                        value={settings.homepage?.categorySort || 'name'}
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, categorySort: e.target.value}})}
                      >
                        <option value="name">Tên danh mục (A-Z)</option>
                        <option value="latest">Mới thêm gần đây</option>
                        <option value="clicks">Lượt click nhiều nhất</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">local_fire_department</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Best Deals</label>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng hiển thị</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="12"
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                        value={settings.homepage?.dealsCount || 3} 
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, dealsCount: parseInt(e.target.value)}})} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sắp xếp theo</label>
                      <select 
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black appearance-none"
                        value={settings.homepage?.dealsSort || 'latest'}
                        onChange={e => setSettings({...settings, homepage: {...settings.homepage, dealsSort: e.target.value}})}
                      >
                        <option value="latest">Mới thêm gần đây</option>
                        <option value="usage">Lượt sử dụng nhiều nhất</option>
                      </select>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'Display' && (
          <div className="space-y-8 animate-in fade-in">
             <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Cài đặt hiển thị phụ</h3>
                <button onClick={() => handleSaveGroup('display')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.display ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.display ? 'Đã lưu' : 'Lưu cài đặt'}
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">view_sidebar</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sidebar Store Count</label>
                  </div>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                    value={settings.display?.sidebarStoreCount || 3} 
                    onChange={e => setSettings({...settings, display: {...settings.display, sidebarStoreCount: parseInt(e.target.value)}})} 
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Số lượng "Similar Stores" trong trang chi tiết.</p>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">segment</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Footer Category Count</label>
                  </div>
                  <input 
                    type="number" 
                    min="1" 
                    max="12"
                    className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                    value={settings.display?.footerCategoryCount || 4} 
                    onChange={e => setSettings({...settings, display: {...settings.display, footerCategoryCount: parseInt(e.target.value)}})} 
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Số lượng danh mục hiển thị dưới chân trang.</p>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons-round text-primary-500">store</span>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Footer Store Count</label>
                  </div>
                  <input 
                    type="number" 
                    min="1" 
                    max="12"
                    className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl p-4 font-black" 
                    value={settings.display?.footerStoreCount || 4} 
                    onChange={e => setSettings({...settings, display: {...settings.display, footerStoreCount: parseInt(e.target.value)}})} 
                  />
                  <p className="text-[10px] text-slate-400 font-medium">Số lượng cửa hàng phổ biến dưới chân trang.</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'Branding' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Nhận diện thương hiệu</h3>
                <button onClick={() => handleSaveGroup('branding')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.branding ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.branding ? 'Đã lưu' : 'Lưu Branding'}
                </button>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Logo Website</label>
                  <div className="aspect-video max-w-sm mx-auto rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden relative group shadow-inner">
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain p-6" />
                    ) : (
                      <span className="material-icons-round text-5xl text-primary-500">local_offer</span>
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <button onClick={() => logoInputRef.current?.click()} className="text-white font-black text-[10px] uppercase tracking-widest bg-primary-500 px-4 py-2 rounded-lg">Thay đổi Logo</button>
                    </div>
                  </div>
                  <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'logoUrl')} />
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Favicon</label>
                  <div className="size-32 mx-auto rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden relative group shadow-inner">
                    {settings.faviconUrl ? (
                      <img src={settings.faviconUrl} alt="Favicon Preview" className="size-16 object-contain" />
                    ) : (
                      <span className="material-icons-round text-4xl text-slate-300">broken_image</span>
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <button onClick={() => faviconInputRef.current?.click()} className="text-white font-black text-[10px] uppercase tracking-widest bg-primary-500 px-3 py-2 rounded-lg">Thay đổi</button>
                    </div>
                  </div>
                  <input type="file" ref={faviconInputRef} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'faviconUrl')} />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-slate-100 dark:border-slate-700">
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Màu chủ đạo</p>
                     <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="size-10 rounded-xl border-0 cursor-pointer p-0 overflow-hidden" />
                   </div>
                   <p className="font-black text-lg">{settings.primaryColor}</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-slate-100 dark:border-slate-700">
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Màu phụ</p>
                     <input type="color" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} className="size-10 rounded-xl border-0 cursor-pointer p-0 overflow-hidden" />
                   </div>
                   <p className="font-black text-lg">{settings.secondaryColor}</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-slate-100 dark:border-slate-700">
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Màu chữ</p>
                     <input type="color" value={settings.textColor} onChange={e => setSettings({...settings, textColor: e.target.value})} className="size-10 rounded-xl border-0 cursor-pointer p-0 overflow-hidden" />
                   </div>
                   <p className="font-black text-lg">{settings.textColor}</p>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'Typography' && (
          <div className="space-y-12 animate-in fade-in">
             <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Kiểu chữ & Kích thước</h3>
                <button onClick={() => handleSaveGroup('typo')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.typo ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.typo ? 'Đã lưu' : 'Lưu Typography'}
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Font chữ hệ thống</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.fontFamily} onChange={e => setSettings({...settings, fontFamily: e.target.value})}>
                      {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                   </select>
                   <p className="text-[10px] text-slate-400 font-medium italic">Thay đổi font chữ cho toàn bộ nội dung website.</p>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kích thước chữ nội dung (Body)</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.fontSizeBody} onChange={e => setSettings({...settings, fontSizeBody: e.target.value})}>
                      {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kích thước Tiêu đề chính (H1)</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.fontSizeH1} onChange={e => setSettings({...settings, fontSizeH1: e.target.value})}>
                      {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kích thước Tiêu đề phụ (H2)</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.fontSizeH2} onChange={e => setSettings({...settings, fontSizeH2: e.target.value})}>
                      {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
             </div>

             <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Preview Typography</h4>
                <div style={{ fontFamily: settings.fontFamily }}>
                   <h1 style={{ fontSize: settings.fontSizeH1 }} className="font-black mb-2">H1: Awesome Headline</h1>
                   <h2 style={{ fontSize: settings.fontSizeH2 }} className="font-bold mb-4">H2: Section Sub-heading</h2>
                   <p style={{ fontSize: settings.fontSizeBody }} className="leading-relaxed text-slate-600 dark:text-slate-400">
                      Đây là đoạn văn bản mẫu để bạn có thể xem trước kích thước và kiểu chữ. Website của bạn sẽ trông như thế này khi áp dụng cài đặt mới.
                   </p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'SEO' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Tối ưu công cụ tìm kiếm</h3>
                <button onClick={() => handleSaveGroup('seo')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${saveStatus.seo ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                  {saveStatus.seo ? 'Đã lưu' : 'Lưu SEO'}
                </button>
             </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề Meta (Thẻ Title)</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-black" value={settings.metaTitle} onChange={e => setSettings({...settings, metaTitle: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả Meta (Description)</label>
              <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl p-4 font-medium h-24 resize-none" value={settings.metaDescription} onChange={e => setSettings({...settings, metaDescription: e.target.value})} />
            </div>
          </div>
        )}

        {activeTab === 'Database' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-10 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="material-icons-round text-amber-600 dark:text-amber-400">storage</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display">Kết nối Cơ sở dữ liệu (SQL)</h2>
                  <p className="text-slate-500 text-sm font-medium">Cấu hình URL API để lưu trữ dữ liệu lên hosting của bạn.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL API (api.php)</label>
                  <div className="flex flex-col md:flex-row gap-3 mt-2">
                    <input 
                      type="text" 
                      placeholder="https://yourdomain.com/api.php"
                      className="flex-1 bg-white dark:bg-slate-900 rounded-xl p-4 font-bold border-0 focus:ring-2 focus:ring-primary-500" 
                      defaultValue={localStorage.getItem('cw_api_url') || ''} 
                      id="remote-api-url"
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('remote-api-url') as HTMLInputElement;
                        if (input) {
                          if (window.confirm('Thay đổi URL API sẽ tải lại trang để áp dụng kết nối mới. Bạn có chắc chắn?')) {
                            MockDB.setApiUrl(input.value);
                          }
                        }
                      }}
                      className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition shadow-lg"
                    >
                      Lưu & Kết nối
                    </button>
                  </div>
                  <div className="mt-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Hướng dẫn kết nối:</h4>
                    <ol className="text-sm text-slate-500 space-y-3 list-decimal ml-4 font-medium">
                      <li>Tải file <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-500">api.php</code> và <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-500">database.sql</code> lên hosting của bạn.</li>
                      <li>Mở phpMyAdmin, tạo database và Import file <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-500">database.sql</code>.</li>
                      <li>Chỉnh sửa thông tin Database (host, dbname, user, pass) trong file <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-500">api.php</code>.</li>
                      <li>Copy URL của file <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-500">api.php</code> dán vào ô bên trên và nhấn Lưu.</li>
                    </ol>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                       <p className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                         <span className="material-icons-round text-sm">info</span>
                         Lưu ý: Hosting của bạn cần hỗ trợ CORS để Preview này có thể gửi dữ liệu tới.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Advanced' && (
          <div className="space-y-12 animate-in fade-in">
             <div className="space-y-4 p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custom CSS</h3>
                   <button onClick={() => handleSaveGroup('css')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase transition-all ${saveStatus.css ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                     {saveStatus.css ? 'Đã lưu' : 'Lưu CSS'}
                   </button>
                </div>
                <textarea className="w-full bg-slate-900 text-emerald-400 font-mono text-sm rounded-2xl p-6 h-48 resize-y focus:ring-2 focus:ring-primary-500 outline-none border-0" value={settings.customCss} onChange={e => setSettings({...settings, customCss: e.target.value})} />
             </div>

             <div className="space-y-4 p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Header Code Injection</h3>
                   <button onClick={() => handleSaveGroup('header')} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase transition-all ${saveStatus.header ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-slate-900'}`}>
                     {saveStatus.header ? 'Đã lưu' : 'Lưu Header'}
                   </button>
                </div>
                <textarea className="w-full bg-slate-900 text-blue-400 font-mono text-xs rounded-2xl p-5 h-32 outline-none border-0" value={settings.headerCode} onChange={e => setSettings({...settings, headerCode: e.target.value})} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
