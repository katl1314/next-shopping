import type { Metadata, NextPage } from 'next';
import ProductPageClient from './page.client';
import getAllProducts from '@/app/services/get-all-products';
import type { ApiContext } from '@/app/types';
import Flex from '@components/layout/Flex';

// 클라이언트 사이드 렌더링에서는 next.js proxy를 사용 불가
const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL ?? 'https://varied-valene-choiminhyeok.koyeb.app',
};

const ProductPage: NextPage = () => {
  return (
    <Flex
      paddingtop="16px"
      paddingbottom="16px"
      paddingleft={{ base: '16px', md: '0px' }}
      paddingright={{ base: '16px', md: '0px' }}
    >
      <ProductPageClient />
    </Flex>
  );
};

export async function generateStaticParams() {
  const products = await getAllProducts(context);
  return products.map(product => ({ id: `${product.id}` }));
}

type Props = {
  params: { id: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { id },
  } = props;
  return {
    title: `${id} 검색`,
    description: '설명',
    // 오픈 그래프 지정 => 콘텐츠를 url로 공유한다, 콘텐츠가 표시되는 방식을 관리하기 위한 목적임.
    openGraph: {
      title: `${id} 검색`,
      description: '설명',
      url: 'https://test.com',
      images: [{ url: 'https://nextjs.org/og.png', width: 800, height: 600 }],
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
    },
  };
};

export default ProductPage;
