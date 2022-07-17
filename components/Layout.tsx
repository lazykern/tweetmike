import React from 'react';
import Header from './Header';
import Head from 'next/head';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div className="min-h-screen mx-auto flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
