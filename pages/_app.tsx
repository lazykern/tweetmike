import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from 'context/AuthContext'
import ProtectedRoute from '@components/ProtectedRoutes'
import { useRouter } from 'next/router';

const noAuthRoutes = ['/login']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
  <AuthContextProvider>
    {noAuthRoutes.includes(router.pathname) ? (
      <Component {...pageProps} />
    ) :
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    }
  </AuthContextProvider>

  )
}

export default MyApp
