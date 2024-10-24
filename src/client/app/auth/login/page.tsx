'use client'

import React, { CSSProperties } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    //console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`);
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    //signIn('facebook');
    router.push(`${window.location.origin}/api/auth/facebook`);

  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin} style={styles.button}>
        Sign in with Google
      </button>
      <button onClick={handleFacebookLogin} style={styles.button}>
        Login with Facebook
      </button>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    rowGap: '1rem'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Login;