import Layout from '@components/Layout';
import ProtectedRoute from '@components/ProtectedRoutes';

import {AuthContextProvider} from '@contexts/AuthContext';
import {ThemeProvider} from 'next-themes';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import '../styles/globals.css';

const noAuthRoutes = ['/'];

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default MyApp;
