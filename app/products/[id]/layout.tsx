import '../../globals.css';
import type { Metadata } from 'next';
import Box from '@components/layout/Box';
import { useProduct } from '@/app/services/products/use-product';
import { ApiContext } from '@/app/types';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      width={{ base: '90%', md: '1075px' }}
      marginleft="auto"
      marginright="auto"
      margintop="0"
      marginbottom="0"
    >
      {children}
    </Box>
  );
}

type Props = {
  params: { id: string };
};

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { id },
  } = props;
  return {
    // title: `${id} 검색`,
    // description: '설명',
    // 오픈 그래프 지정 => 콘텐츠를 url로 공유한다, 콘텐츠가 표시되는 방식을 관리하기 위한 목적임.
    openGraph: {
      title: id,
      description: '설명',
      url: 'https://test.com',
      images: [
        {url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,}
      ],
    },
    robots: {
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
};
