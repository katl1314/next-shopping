'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import Text from './components/atoms/Text';
import Box from './components/layout/Box';
import Flex from './components/layout/Flex';
import ProductCard from './components/organisms/ProductCard';
import ProductCardCarousel from './components/organisms/ProductCardCarousel';
import { useProducts } from './services/products/use-product';
import type { Product, ApiContext } from './types';

interface IHomePageProps {
  bookProducts: Product[];
  clothesProducts: Product[];
  shoesProducts: Product[];
}

const HomePage: NextPage<IHomePageProps> = () => {
  // 상품 카드 캐러셀 => getStaticProps을 호출하여 미리 생성해두는 방식 => next13에서는 fetch로 처리한다. (next: { revalidate: 10})
  const renderProductCardCarousel = (products: Product[]) => (
    <ProductCardCarousel>
      {products.map(product => (
        <Box paddingleft="8px" key={product.id}>
          <Link href={`/products/${product.id}`}>
            <ProductCard
              variant="small"
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Link>
        </Box>
      ))}
    </ProductCardCarousel>
  );

  const context: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? 'http://127.0.0.1:5000',
  };

  const clothesProducts = useProducts(context, { category: 'clothes' });
  const bookProducts = useProducts(context, { category: 'book' });
  const shoesProducts = useProducts(context, { category: 'shoes' });

  return (
    <>
      <Flex padding="16px" justifycontent="center" backgroundcolor="primary">
        <Flex width="100%" justifycontent="center" alignitems="center" flexdirection="column">
          <Box width="100%">
            <Text
              marginbottom="4px"
              lineheight="2"
              color="white"
              fontSize={{ base: '22px', md: '32px' }}
            >
              Gihyo C2C에서
            </Text>
            <Text
              marginbottom="4px"
              lineheight="2"
              color="white"
              fontSize={{ base: '22px', md: '32px' }}
            >
              마음에 드는 아이템을 찾자.
            </Text>
          </Box>
          <Box width="100%">
            <Text color="white" fontSize={{ base: '16px', md: '22px' }}>
              Gihyo C2C는 실전적인 Next.js 애플리케이션 개발에서 사용되는 데모 애플리케이션입니다.
            </Text>
          </Box>
        </Flex>
      </Flex>
      {/* 상품 소개 */}
      <Flex
        paddingbottom="16px"
        paddingleft="16px"
        paddingright="16px"
        justifycontent="center"
        flexdirection="column"
      >
        <Box width="100%">
          <Text variant="large">의류</Text>
          {renderProductCardCarousel(clothesProducts.data)}
        </Box>
        <Box width="100%" margin="0 auto">
          <Text variant="large">도서</Text>
          {renderProductCardCarousel(bookProducts.data)}
        </Box>
        <Box width="100%" margin="0 auto">
          <Text variant="large">신발</Text>
          {renderProductCardCarousel(shoesProducts.data)}
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;
