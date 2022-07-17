import Head from 'next/head';
import React from 'react';
import ResponsiveAppBar from './AppBar';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Head>
        <title>tweetmike</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen mx-auto flex flex-col">
        <ResponsiveAppBar />
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
