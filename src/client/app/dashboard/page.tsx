'use client'

import React, { useContext, useEffect, CSSProperties } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { AuthContext } from '../../components/context/AuthContext';

const Dashboard = () => {
  const { user, logout, fetchToken, fetchUser, setLoading, setToken }: any = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      //await fetchToken();
      //await fetchUser();
      setLoading(false);
    })();
  }, []);

  return (
    <ProtectedRoute>
      <div style={styles.container}>
        <h1>Dashboard</h1>
        {user && (
          <>
            <p>Welcome, {user.firstName} {user.lastName}!</p>
            <img src={user.picture} alt="User Avatar" style={styles.avatar} />
            <button onClick={logout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Dashboard;
