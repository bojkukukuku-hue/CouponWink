
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-10">
          <div className="size-16 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mx-auto mb-6">
             <span className="material-icons-round text-3xl">lock_reset</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">Reset Password</h1>
          <p className="text-slate-500 font-medium mt-2">Enter your email and we'll send you a recovery link.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Email Address</label>
            <input className="w-full rounded-2xl border-0 bg-slate-50 dark:bg-slate-800 p-4 font-medium" placeholder="name@company.com" type="email" />
          </div>
          <button className="w-full bg-primary-500 hover:bg-primary-600 text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition">
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm font-bold text-slate-500 mt-8">
          Remember your password? <Link to="/login" className="text-primary-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
