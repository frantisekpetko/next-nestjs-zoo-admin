'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Navigation from '@/components/common/Navigation';
import Content from '@/components/common/Content';
import Footer from '@/components/common/Footer';
import ToastErrorMessage from '@/components/ToastErrorMessage';
import { useStoreActions } from 'my-store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment } from '@mui/material';
const RegisterPage: React.FC = () => {
  const signUp = useStoreActions((actions) => actions.user.signUp);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();

  const submit = async () => {
    try {
      await signUp({ username, password });
      toast.success('You are registered!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        icon: false,
      });
    } catch (error: any) {
      let errorMessage = { message: 'Unknown error' };
      if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors;
      }
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(<ToastErrorMessage message={errorMessage} />, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        icon: false,
      });
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <>
    <Navigation />
      <Content>
        <div className="max-w-[450px] p-4 after:rounded-md] mx-auto border border-gray-200 shadow-md">
          <h1 className="text-center text-2xl font-bold mb-4">User Registration</h1>
            <TextField
              className="w-full"
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="dense"
            />
          
            <TextField
              className="w-full"
              label="Password"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

          <Button
            variant="text"
            color="success"
            fullWidth

            onClick={submit}
          >
            Register
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            className="mt-4"
            onClick={goToLogin}
          >
            Have an account? Sign in now!
          </Button>
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default RegisterPage;