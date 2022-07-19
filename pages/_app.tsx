import Layout from '@components/Layout';
import ProtectedRoute from '@components/ProtectedRoutes';

import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'next-themes';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import '../styles/globals.css';

const noAuthRoutes = ['/'];

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          {noAuthRoutes.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
