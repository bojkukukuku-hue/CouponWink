
import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">Create Account</h1>
            <p className="text-slate-500 font-medium">Join 100,000+ users saving money every day.</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold">Full Name</label>
              <input className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Email Address</label>
              <input className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium" placeholder="name@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Password</label>
              <input className="w-full rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 p-4 font-medium" placeholder="••••••••" type="password" />
            </div>
            <p className="text-xs text-slate-400 font-medium">By signing up, you agree to our <Link to="/legal" className="text-primary-500">Terms</Link> and <Link to="/legal" className="text-primary-500">Privacy Policy</Link>.</p>
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-slate-900 font-black py-4 rounded-2xl text-center shadow-xl shadow-primary-500/30 transition">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-500">
            Already have an account? <Link to="/login" className="text-primary-500">Sign In</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-20">
         <div className="text-center">
            <div className="size-24 rounded-3xl bg-primary-500 flex items-center justify-center text-slate-900 mx-auto mb-8 shadow-2xl shadow-primary-500/20">
               <span className="material-icons-round text-5xl text-white">loyalty</span>
            </div>
            <h2 className="text-white text-4xl font-black font-display mb-4">Start Saving Today</h2>
            <p className="text-slate-400 text-lg font-medium">Unlock exclusive members-only deals and get early access to major sales events.</p>
         </div>
      </div>
    </div>
  );
};

export default SignupPage;
