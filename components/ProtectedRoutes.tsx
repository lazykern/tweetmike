import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@contexts/AuthContext';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;