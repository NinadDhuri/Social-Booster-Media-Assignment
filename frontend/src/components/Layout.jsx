import React from 'react';
import Navbar from './Navbar';
import CurrencyWidget from './CurrencyWidget';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {children}
          </div>
          <div className="lg:col-span-1">
             <CurrencyWidget />
          </div>
        </div>
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Expense Tracker Demo
      </footer>
    </div>
  );
};

export default Layout;
