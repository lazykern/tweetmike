import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import { useSession } from 'next-auth/react';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {data: session} = useSession();
  const router = useRouter();


  useEffect(() => {
    if (session === null) {
      console.log('go back')
      router.push('/');
    }
  }, [router, session]);

  return <>{session ? children : null}</>;
};

export default ProtectedRoute;
