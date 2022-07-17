import React from 'react';

import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';

import {ThemeProvider} from 'next-themes';

import ProtectedRoute from '@components/ProtectedRoutes';
import Layout from '@components/Layout';
import {AuthContextProvider} from 'context/AuthContext';

const noAuthRoutes = ['/'];

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
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
