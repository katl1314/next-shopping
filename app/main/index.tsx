'use client';

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
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </AuthContextProvider>
    </StyledComponentsRegistry>
  );
};

export default Main;
