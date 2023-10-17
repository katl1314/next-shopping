'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from './context/AuthContext';
import ShoppingCartProvider from './context/ShoppingCartContext';
import StyledComponentsRegistry from './lib/registry';
import { ApiContext } from './types';
import Header from '@components/organisms/Header';

const inter = Inter({ subsets: ['latin'] });

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {/* _app.tsx대신 최상위 layout.tsx에서 Provider를 감싼다. */}
          <AuthContextProvider context={context}>
            <Header />
            <ShoppingCartProvider>{children}</ShoppingCartProvider>
          </AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
