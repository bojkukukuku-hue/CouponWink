
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;
