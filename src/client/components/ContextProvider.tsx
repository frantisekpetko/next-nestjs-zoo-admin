'use client';

//import { AuthProvider } from "main-components/context/AuthContext";
import React from "react";
import { StoreProvider } from 'easy-peasy';
import store from 'my-store';

export default function ContextProvider({children}: React.PropsWithChildren) {
  return <StoreProvider store={store}>
    {children}
  </StoreProvider>;
};