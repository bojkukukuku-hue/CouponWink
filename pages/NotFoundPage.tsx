
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-3xl"></div>
          <img 
            alt="Funny 404 Robot" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgwND26zfU7gDJCPBWBTHiMAG5HZkkTuKX-dODAEf_YLPTgUOnvb3TG77QY-lR49lCPbEXvuPp6qykQNmo3ROiXn4b8_R3P0NMDD5MtZwz-1FZYJNsIhWqRu-KzZEQ-TgJpFfl5uf7BILKRUhNkBKpglSWJ03KqdwxCH-n9oRh3FRYmrdANJwha4EU0BA_j8aw7P8CpyKdMMXb_y852gSlFhD9c7csBkFZAw-uFXzVFcC-zOOKJp6_a97OqTDMgBtCeK5fOzNFjog" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
        <h1 className="text-8xl md:text-9xl font-black text-primary-500 font-display">404</h1>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mt-4 font-display">
          Oops! This page has expired <br className="hidden md:block"/> (just like an old coupon).
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-xl text-lg font-medium">
          The page you are looking for might have been moved, deleted, or never existed. Don't worry, you can still save money elsewhere.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="bg-primary-500 hover:bg-primary-600 text-white font-black px-8 py-3 rounded-2xl transition shadow-xl shadow-primary-500/20">
            Back to Home
          </Link>
          <Link to="/search" className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black px-8 py-3 rounded-2xl transition">
            Browse Stores
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
