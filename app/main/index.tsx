'use client';

import Box from '../components/layout/Box';
import StyledComponentsRegistry from '../lib/registry';
import type { ApiContext } from '../types';
import Header from '@components/organisms/Header';
import { AuthContextProvider } from '@context/AuthContext';
import ShoppingCartProvider from '@context/ShoppingCartContext';

type MainProps = {
  children: React.ReactElement;
};

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

const Main = ({ children }: MainProps) => {
  return (
    <StyledComponentsRegistry>
      {/* _app.tsx대신 최상위 layout.tsx에서 Provider를 감싼다. */}
      <AuthContextProvider context={context}>
        <Header />
        <ShoppingCartProvider>
          <Box
            paddingtop="90px"
            maxwidth={{ base: '90%', md: '1075px' }}
            marginleft="auto"
            marginright="auto"
            margintop="0"
            marginbottom="0"
          >
            {children}
          </Box>
        </ShoppingCartProvider>
      </AuthContextProvider>
    </StyledComponentsRegistry>
  );
};

export default Main;
