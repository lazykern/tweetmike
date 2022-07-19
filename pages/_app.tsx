import React, {useEffect, useState} from 'react';

import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';

import { ThemeProvider } from 'next-themes';

import ProtectedRoute from '@components/ProtectedRoutes';
import Layout from '@components/Layout';
import {AuthContextProvider} from '@contexts/AuthContext';
import {TwitterContextProvider} from '@contexts/TwitterContext';

const noAuthRoutes = ['/'];

function MyApp({Component, pageProps}: AppProps) {

  const router = useRouter();
  return (
    <AuthContextProvider>
      <TwitterContextProvider>
        <ThemeProvider defaultTheme='dark'>
            <Layout>
              {noAuthRoutes.includes(router.pathname) ? (
                <Component {...pageProps}/>
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps}/>
                </ProtectedRoute>
              )}
            </Layout>
        </ThemeProvider>
      </TwitterContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
