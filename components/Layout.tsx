import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Head>
        <title>tweetmike</title>
        <meta>name="description" content="tweetmike"</meta>
      </Head>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};

export default Layout;
