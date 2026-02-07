
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsOJ8_MC4zXSQ3eRBrEyffti_4u7UkS3iHWAvE-_-l-3i95xoFpP7s__pKCjrcBx9s3BXuwr1_LxZGhmMSEkHSzqi_I_pVyUdBgXSiIOiobrqny6SDR11nrwdPlCFrhOaoNGBrTbUoTWasOuhxEgM7GM4oIyK0mhhTJXFUFYJH79KF33vXubD8h01JsJrH5p_UfTXwvZOTiJkdzatVBvrtqdEMXd_gTUbzQ5uXDN-QW8_S7KQqF1MHmwdNG11yQvH1nQ9bygO6KEk")'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>)}
               <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center text-xs font-black">+10k</div>
            </div>
            <div className="text-white">
               <div className="flex text-yellow-400 text-sm">
                 {Array(5).fill(0).map((_, i) => <span key={i} className="material-icons-round text-base">star</span>)}
               </div>
               <span className="text-xs font-bold">Loved by professionals</span>
            </div>
          </div>
          <h2 className="text-white text-4xl font-black leading-tight mb-4 font-display">Join 10,000+ users saving daily on top AI tools</h2>
          <p className="text-slate-300 text-lg font-medium">Experience the future of productivity with exclusive deals and seamless integration.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your details to access your savings.</p>
          </div>

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-bold transition hover:bg-slate-50 dark:hover:bg-slate-800">
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
            Sign in with Google
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-black text-slate-400 uppercase tracking-widest">Or email</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">Email Address</label>
              <input className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium" placeholder="name@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Password</label>
              <input className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium" placeholder="••••••••" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                <span className="text-sm font-bold">Remember me</span>
              </label>
              <Link to="/forgot-password" title="Forgot Password" className="text-sm font-bold text-primary-500">Forgot password?</Link>
            </div>
            <Link to="/admin/dashboard" className="block w-full bg-primary-500 hover:bg-primary-600 text-slate-900 font-black py-4 rounded-2xl text-center shadow-xl shadow-primary-500/30 transition">
              Sign In
            </Link>
          </form>

          <p className="text-center text-sm font-bold text-slate-500">
            Don't have an account? <Link to="/signup" className="text-primary-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
