'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '@/components/context/AuthContext';
import { useSearchParams } from 'next/navigation'

const Callback = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { user, logout, fetchToken, fetchUser, setLoading, setUser, setToken, token }: any = useContext(AuthContext);

  useEffect(() => {
    /*
    const url = window.location.href;
    const urlParams = new URL(url);
    const token = urlParams.searchParams.get('token');
    */
    console.log(params.get('token'));
    setToken(params.get('token'));
    window.localStorage.setItem('token', params.get('token') as string);

    const fetchSession = async () => {
      try {
        // Optionally, you can fetch user data or validate the session
        console.log({ fetchSessionTokenStorage: window.localStorage.getItem('token') });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/facebook/protected`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        });
        setUser(response.data.user);
        router.push('/dashboard');
      } catch (error) {
        console.error('Authentication failed', error, window.localStorage.getItem('token'), user);
        router.push('/auth/login');
      }
    };




    if (params.get('token')) {
      fetchSession();
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;