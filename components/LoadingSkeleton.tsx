
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-4" />
      <div className="flex items-center gap-2">
        <div className="bg-primary-500 text-white p-1 rounded-md">
          <span className="material-icons-round text-xl">local_offer</span>
        </div>
        <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">CouponWink</span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm font-bold uppercase tracking-widest animate-pulse">Loading Deals...</p>
    </div>
  );
};

export default LoadingSkeleton;
