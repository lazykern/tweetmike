import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push('/');
    }
  }, [router, session]);

  return <>{session ? children : null}</>;
};

export default ProtectedRoute;
