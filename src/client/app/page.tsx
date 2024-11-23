"use client";

import Navigation from 'components/common/Navigation';
import Footer from 'components/common/Footer';
import Content from 'components/common/Content';
import { lazy, useEffect } from 'react';
import Heading from 'components/Heading';
import { useStoreState } from 'my-store';
import { useStoreActions } from 'my-store';
//import { Metadata } from 'next';

/*
export const Heading = styled.h2`
    text-align: center;
    padding: 0 0.5em;
    font-family: 'Nothing You Could Do', cursive;
    font-display: swap;
    font-weight: 700;
    font-size: 4rem;
    margin-bottom: 2rem !important;
    margin-top: 2rem;
`;
*/

const LazyNavigation =  lazy(() => import('components/common/Navigation'))
const LazyFooter =      lazy(() => import('components/common/Footer'));
const LazyContent =     lazy(() => import('components/common/Content'))
const LazyHeading =     lazy(() => import('components/Heading'));
/*
export const metadata: Metadata = {
  title: 'Zoo Admin'
}
*/

//className={'heading'}

function Page() {
  //let auth = window.localStorage.getItem('token');
  const token = useStoreState((state) => state.user.token);
  const loadTokenToMemory = useStoreActions((actions) => actions.user.loadTokenToMemory);

  useEffect(() => {
    loadTokenToMemory();
    console.log('auth', token);
  }, []);

  return (
    <>
      <Navigation />
        <Content>
          <Heading>
            {token ? 'Hey, You are logged in !' : 'Basic zoo admin app'}
            </Heading>
        </Content>
        <Footer/>
    </>
  );
  
/*
   return (
      <Suspense>
        <div>dgwagawd</div>
        <LazyNavigation />
        <LazyContent>
          <LazyHeading  />
        </LazyContent>
          <LazyFooter />
        </Suspense>
    );

*/
}

export default Page;
