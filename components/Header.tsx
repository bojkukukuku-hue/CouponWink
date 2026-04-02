
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MockDB } from '../services/mockDb';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const loadedMenus = MockDB.getMenus().filter((m: any) => m.visible);
    setMenus(loadedMenus);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-500 text-white p-1 rounded-md">
              <span className="material-icons-round text-2xl">local_offer</span>
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-display">CouponWink</span>
          </Link>

          {/* Desktop Nav - Now Dynamic */}
          <nav className="hidden md:flex space-x-10 text-[11px] font-black uppercase tracking-widest">
            {menus.map((item) => (
              <Link 
                key={item.id} 
                to={item.path} 
                className="text-slate-500 hover:text-primary-500 dark:text-slate-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {menus.length === 0 && (
              <>
                <Link to="/" className="text-primary-500">Home</Link>
                <Link to="/categories" className="text-slate-500 hover:text-primary-500 dark:text-slate-300 transition-colors">Categories</Link>
                <Link to="/search" className="text-slate-500 hover:text-primary-500 dark:text-slate-300 transition-colors">Stores</Link>
                <Link to="/blog" className="text-slate-500 hover:text-primary-500 dark:text-slate-300 transition-colors">Blog</Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden lg:block text-slate-500 hover:text-slate-900 dark:hover:text-white text-[11px] font-black uppercase tracking-widest">Submit Deal</button>
            <Link to="/signup" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg shadow-primary-500/20 active:scale-95">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
