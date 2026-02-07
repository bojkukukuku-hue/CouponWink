
import React from 'react';

const AdminEditor: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-display">New Blog Post</h1>
          <p className="text-slate-500 font-medium">Draft and publish content for the CouponWink blog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-sm">Save Draft</button>
          <button className="bg-primary-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-primary-500/20">Publish Post</button>
        </div>
      </div>

      <div className="space-y-6">
        <input className="w-full bg-transparent border-0 border-b-2 border-slate-100 dark:border-slate-800 py-4 text-4xl font-black font-display focus:border-primary-500 focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-700" placeholder="Post Title..." />
        
        <div className="flex flex-wrap gap-4">
           <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm font-bold">
             <option>Category: Review</option>
             <option>Category: Tutorial</option>
             <option>Category: News</option>
           </select>
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-500">
             <span className="material-icons-round text-base">image</span> Add Featured Image
           </button>
        </div>

        <textarea className="w-full h-[50vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 font-medium text-lg focus:ring-2 focus:ring-primary-500 focus:border-0 outline-none" placeholder="Start writing..."></textarea>
      </div>
    </div>
  );
};

export default AdminEditor;
