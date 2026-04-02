
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy đường dẫn trước đó (nếu có)
  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await MockDB.login(username, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Lỗi đăng nhập.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200")'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary-500 text-white p-2 rounded-xl">
               <span className="material-icons-round text-2xl">local_offer</span>
            </div>
            <span className="text-2xl font-black text-white font-display">CouponWink Admin</span>
          </div>
          <h2 className="text-white text-4xl font-black leading-tight mb-4 font-display">Hệ thống quản trị nội dung</h2>
          <p className="text-slate-300 text-lg font-medium">Đăng nhập bằng tài khoản Admin để quản lý mã giảm giá, đối tác và phân tích số liệu.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">Chào mừng trở lại</h1>
            <p className="text-slate-500 font-medium">Chỉ dành cho Quản trị viên hệ thống.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
               <span className="material-icons-round">error</span>
               <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-bold">Tên đăng nhập / Email</label>
              <input 
                required
                className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="admin" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Mật khẩu</label>
              <input 
                required
                className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="block w-full bg-primary-500 hover:bg-primary-600 text-slate-900 font-black py-4 rounded-2xl text-center shadow-xl shadow-primary-500/30 transition disabled:opacity-50"
            >
              {loading ? 'Đang kiểm tra...' : 'Đăng nhập Quản trị'}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-500">
            Quay lại <Link to="/" className="text-primary-500">Trang chủ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
