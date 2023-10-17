import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Main from './main';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Next13 쇼핑몰',
  description: 'Next13으로 구현된 쇼핑몰입니다',
  openGraph: {
    title: 'Next13 쇼핑몰',
    description: 'Next13으로 구현된 쇼핑몰입니다',
    images: [
      {
        url: '/images/1.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
};
