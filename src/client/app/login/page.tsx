'use client'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from 'components/common/Content';
import Footer from 'components/common/Footer';
import Navigation from 'components/common/Navigation';
import ErrorMessage from 'components/ToastErrorMessage';
import ToastErrorMessage from 'components/ToastErrorMessage';
import { useStoreActions, useStoreState } from 'my-store';
import Ajax from 'tools/Ajax';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const Heading = ({children}: {children: React.ReactNode}) => (
  <h1 className={`
      mt-0
      text-black
      text-center
  `}>
      {children}
  </h1>
);

export const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div className={`
      max-w-[450px]
      p-4
      rounded-md
      border
    border-gray-200
      after:shadow-md
  `}>
      {children}
  </div>
);

export const FormField = ({ ...props }) => (
  <TextField
      {...props}
      className={`
          w-full
      `}
  />
);


const Page: FC = (props: any) => {
    const signIn = useStoreActions((actions) => actions.user.signIn);

    const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const save = useStoreActions((actions) => actions.user.saveTokenToStorage);
    const setUserUsername = useStoreActions((actions) => actions.user.setUsername);

    const navigate = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const submit = async () => {
        console.log('check');
        try {
            console.log('submit', { username, password });
            let data = await signIn({ username, password });

            save(data.data?.data?.accessToken);
            setUserUsername(data.data?.data?.username);
            load();

        }
        catch(error: any) {
                toast.dismiss();

                const errorMessage = JSON.parse(JSON.stringify(error));
                //console.log({errorMessage})
                if (Object.keys(errorMessage).length === 0) {
                    toast.error('You are probably offline. Check if your server is running.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                        icon: false

                    });
                }
                else {
                    console.log('errorMessage', error);

                    let errorMessage = { message: 'Unknown error' };

                    
                    if (error.response.data.hasOwnProperty('errors')) {
                        errorMessage = error.response.data.errors;
                    }

                    if (error.response.data.hasOwnProperty('message')) {
                        //errorMessage = error.response.data.message.response.message;
                    }
                    
                    errorMessage = error.response.data.message;
                    console.log('message', errorMessage);
                    toast.error((
                        <ToastErrorMessage message={errorMessage} />
                    ), {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                        icon: false
                    });
                }
        }
        finally {
            if (localStorage.getItem('token') !== null) {
                navigate.replace('/');
            }
        }
    };

    function goToRegister() {
        navigate.push('/register');
    }

    const ENTER_KEY = 13;


    const onEnterHandler = useCallback((event) => {
        const isEnterPressed = event.which === ENTER_KEY
            || event.keyCode === ENTER_KEY;

        if (isEnterPressed) {
            submit();
        }

    }, [submit]);

    return (
        <>
            <Navigation />
            <Content>
                <FormContainer>
                    <h1 className='text-center text-2xl font-bold mb-4'>User Login</h1>
                    <FormField
                        label="Username"
                        margin="dense"
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                            'aria-label': 'theme'
                        }}
                        onKeyUp={onEnterHandler}
                    />
                    <FormField
                        label="Password"
                        margin="dense"
                        variant="filled"
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" sx={{height: '1rem'}}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            'aria-label': 'theme'
                        }}
                        onKeyUp={onEnterHandler}
                    />
                    <Button color="inherit" fullWidth onClick={submit}>
                        Login in
                    </Button>

                    <Button color="primary" fullWidth onClick={goToRegister} sx={{ mt: 2 }}>
                        Don't have an account? Sign up now!
                    </Button>
                </FormContainer>
            </Content>
            <Footer />
        </>
    );
};

export default Page;