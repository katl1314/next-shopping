import '../../globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import StyledComponentsRegistry from '../../lib/registry';
import Box from '@components/layout/Box';

// next/font/google 적용
const inter = Noto_Sans({ subsets: ['latin'], weight: '500' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box
          width={{ base: '90%', md: '1075px' }}
          marginleft="auto"
          marginright="auto"
          margintop="0"
          marginbottom="0"
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Box>
      </body>
    </html>
  );
}

type Props = {
  params: { slug: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;
  return {
    title: `${slug} 검색`,
    description: '설명',
  };
};

// export const metadata: Metadata = {
//   title: '검색',
//   description: '검색 결과',
// };
