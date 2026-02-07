
import React, { useState, useRef } from 'react';

interface MediaFile {
  id: string;
  url: string;
  name: string;
  size: string;
  type: string;
}

const AdminMediaLibrary: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<MediaFile[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300', name: 'ai-banner.jpg', size: '1.2MB', type: 'image/jpeg' },
    { id: '2', url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=300', name: 'hosting-bg.png', size: '2.4MB', type: 'image/png' },
    { id: '3', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=300', name: 'newsletter-hero.jpg', size: '850KB', type: 'image/jpeg' },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile: MediaFile = {
          id: Date.now().toString(),
          url: reader.result as string,
          name: uploadedFile.name,
          size: (uploadedFile.size / (1024 * 1024)).toFixed(2) + 'MB',
          type: uploadedFile.type
        };
        setFiles([newFile, ...files]);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xoá vĩnh viễn tập tin này? Các bài viết sử dụng ảnh này sẽ bị lỗi.')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">Thư viện Media</h1>
          <p className="text-slate-500 font-medium">Quản lý hình ảnh bài viết, logo đối tác và tài nguyên marketing.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-primary-500 hover:bg-primary-600 text-slate-900 px-8 py-4 rounded-2xl font-black transition flex items-center gap-3 shadow-xl shadow-primary-500/20 active:scale-95"
        >
           <span className="material-icons-round">cloud_upload</span> Tải tệp mới
        </button>
        <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {files.map((file) => (
          <div key={file.id} className="group relative aspect-square bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
             <img src={file.url} alt={file.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => window.open(file.url, '_blank')}
                  className="size-10 rounded-xl bg-white text-slate-900 flex items-center justify-center hover:bg-primary-500 hover:text-white transition shadow-xl"
                >
                   <span className="material-icons-round text-lg">visibility</span>
                </button>
                <button 
                  onClick={() => handleDelete(file.id)}
                  className="size-10 rounded-xl bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-xl"
                >
                   <span className="material-icons-round text-lg">delete</span>
                </button>
             </div>
             <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-900/80 to-transparent">
                <p className="text-[9px] font-black text-white truncate uppercase tracking-widest">{file.name}</p>
                <p className="text-[8px] text-slate-300 font-bold uppercase">{file.size}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaLibrary;
