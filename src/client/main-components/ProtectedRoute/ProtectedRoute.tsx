'use client'

import { useContext, useEffect, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: {children: ReactNode | null}) => {
  const { user, loading }: any = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log(user, loading)
    if (!loading && !user) {
      router.push('/auth/login');
    }
    
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;