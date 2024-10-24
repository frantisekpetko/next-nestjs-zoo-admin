'use client'

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ReactNode } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true); // To handle initial loading state

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/token`,
        {
          withCredentials: true, // Include cookies
        }
      );
      setToken(response.data.token);
    } catch (error) {
      setToken('');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      console.log('fetchUser context', { fetchSessionTokenStorage: window.localStorage.getItem('token') })
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/protected`,
        {
          withCredentials: true, // Include cookies
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        }
      );
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user data from protected endpoint to verify authentication
    (async () => {
      //await fetchToken();
      //await fetchUser();
    })();

    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ setUser, user, token, setToken, loading, logout, fetchUser, fetchToken, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};