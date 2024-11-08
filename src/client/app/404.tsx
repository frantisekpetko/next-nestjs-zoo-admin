import './App.css';
import Navigation from 'components/common/Navigation';
import Footer from 'components/common/Footer';
import Content from 'components/common/Content';
import Heading from 'components/Heading';
import styled from 'styled-components';
import type { Metadata } from 'next';

const Description = styled.div`
    font-size: 0.5em;
`;

export const metadata: Metadata = {
  title: '404'
};

// {/*<Head title={'404'} />*/ }

export default function Custom404() {
    return (
      <>
        <Navigation />
        <Content>
          <Heading>
            <>
            
            </>
            404 Error<br />
            <Description>
              Page with url
              <code>'{window.location.pathname}'</code> 
              not found.
              </Description>
          </Heading>
          </Content>
          <Footer/>
        </>
    );
}