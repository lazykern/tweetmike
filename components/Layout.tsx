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
      <div className=" mx-auto flex flex-col">
        <ResponsiveAppBar />
        <main className="flex-grow container mx-auto  ">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
