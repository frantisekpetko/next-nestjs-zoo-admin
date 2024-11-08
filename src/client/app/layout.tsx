

import 'styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
//import ContextProvider from '@/components/ContextProvider';
//import { Suspense, useEffect } from 'react';
//import { createGlobalStyle } from 'styled-components';
import Wrapper from '@/components/Wrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*
import { AuthProvider } from 'main-components/context/AuthContext';
import { Suspense } from 'react';
import AuthContextProvider from '@/components/AuthProvider';
*/



/*
const GlobalStyle = createGlobalStyle`
body {
  visibility: hidden;
}
`;
*/

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zoo Admin',
  description: 'Zoo Admin with zoo animal database',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body
        className={`
          flex 
          flex-col 
          m-0 
          p-0 
          overflow-x-hidden 
          h-full
        `}      
      >
        <ToastContainer />
        <Wrapper>
          <div
            className={`
              max-w-full 
              mx-auto 
              w-full 
              flex 
              flex-col 
              h-screen
          `}>
            {children}
          </div>
        </Wrapper>
      </body>
  </html>
  );
}
