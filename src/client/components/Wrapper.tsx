'use client';

import { PropsWithChildren, Suspense } from "react";
import ContextProvider from "./ContextProvider";

export default function Wrapper({children}: PropsWithChildren) {
  return <>
    <ContextProvider>
      <Suspense>
        {children}
      </Suspense>
    </ContextProvider>
  </>
}