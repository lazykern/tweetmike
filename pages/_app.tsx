import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthContextProvider } from 'context/AuthContext'
import ProtectedRoute from '@components/ProtectedRoutes'
import { useRouter } from 'next/router';

import Layout from '@components/Layout';

import { ThemeProvider } from 'next-themes'

const noAuthRoutes = ['/home']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
  <AuthContextProvider>
    <ThemeProvider>
      <Layout>
        {noAuthRoutes.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) :
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        }
      </Layout>
    </ThemeProvider>
  </AuthContextProvider>

  )
}

export default MyApp
