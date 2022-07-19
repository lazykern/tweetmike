import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@contexts/AuthContext';
import {getCookie} from 'cookies-next';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user, twitterCredential, logout} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!twitterCredential) {
      logout().then(() => {
        router.push('/');
      });
    } else if (!user) {
      router.push('/');
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
