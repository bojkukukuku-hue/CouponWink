
import React, { useEffect, useState, useCallback } from 'react';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: {
    storeName: string;
    storeLogo?: string;
    title: string;
    code: string | null;
    discountValue: string;
    link?: string;
  } | null;
}

const CouponModal: React.FC<CouponModalProps> = ({ isOpen, onClose, coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn('Navigator clipboard failed, using fallback', err);
      // Fallback cho môi trường bị chặn quyền hoặc trình duyệt cũ
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Tránh làm nhảy trang khi append
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  useEffect(() => {
    // Thử copy tự động khi mở modal
    if (isOpen && coupon?.code) {
      handleCopy(coupon.code);
    }
  }, [isOpen, coupon, handleCopy]);

  if (!isOpen || !coupon) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl transform transition-all p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <span className="material-icons-round">close</span>
        </button>

        {/* Success Icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-5 text-emerald-500">
            <span className="material-icons-round text-5xl animate-bounce">check_circle</span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display">
          {copied ? 'Code Copied!' : 'Your Promo Code'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
          {copied ? 'The code has been copied to your clipboard.' : 'Copy the code below to use at checkout.'}
        </p>

        {/* Coupon Card Box */}
        <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div className="size-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700">
              <span className="font-black text-primary-500">{coupon.storeName.charAt(0)}</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">{coupon.storeName}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-black text-primary-500">{coupon.discountValue}</span>
          </div>

          <div className="relative group cursor-pointer" onClick={() => coupon.code && handleCopy(coupon.code)}>
            <div className="w-full border-2 border-dashed border-primary-300 dark:border-primary-700 bg-white dark:bg-slate-900 rounded-xl py-4 px-6 flex items-center justify-between relative overflow-hidden group-hover:border-primary-500 transition-colors">
              <span className="font-mono text-2xl font-black tracking-[0.2em] text-slate-900 dark:text-white mx-auto">
                {coupon.code || "DEAL ACTIVATED"}
              </span>
              <div className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded shadow-sm uppercase tracking-tighter text-[10px] font-black transition-all ${copied ? 'bg-primary-500 text-white opacity-100' : 'bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100'}`}>
                {copied ? 'Copied' : 'Copy'}
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="w-full text-left mb-8 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="size-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">Chúng tôi đã mở trang đối tác trong tab mới.</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="size-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">Dán mã này khi thanh toán để nhận ưu đãi.</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-3">
           <a 
            href={coupon.link || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black py-4 px-6 rounded-xl shadow-xl transition-all hover:bg-slate-800 dark:hover:bg-slate-50 flex items-center justify-center gap-2 active:scale-95"
          >
            Go to Store
            <span className="material-icons-round text-lg">open_in_new</span>
          </a>
          
          <button 
            onClick={() => coupon.code && handleCopy(coupon.code)}
            className="w-full py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary-500 transition-colors"
          >
            {copied ? 'Copied to clipboard' : 'Click to copy code again'}
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-6 text-[10px] text-slate-400 hover:text-slate-600 font-black uppercase tracking-[0.2em] transition-colors"
        >
          Close and Browse
        </button>
      </div>
    </div>
  );
};

export default CouponModal;
