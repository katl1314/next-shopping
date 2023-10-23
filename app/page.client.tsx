'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Text from './components/atoms/Text';
import Box from './components/layout/Box';
import Flex from './components/layout/Flex';
import ProductCard from './components/organisms/ProductCard';
// import ProductCardCarousel from './components/organisms/ProductCardCarousel';
import { useProducts } from './services/products/use-product';
import type { Product, ApiContext } from './types';

const CarouselView = styled(Flex)`
  overflow-x: scroll;
  flex-wrap: nowrap;

  /* x축 스크롤바 숨김 처리 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MainContent = () => {
  // 상품 카드 캐러셀 => getStaticProps을 호출하여 미리 생성해두는 방식 => next13에서는 fetch로 처리한다. (next: { revalidate: 10})
  const renderProductCardCarousel = (products: Product[]) => (
    <CarouselView>
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
    </CarouselView>
  );

  const context: ApiContext = { apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '' };

  const clothesProducts = useProducts(context, { category: 'clothes' });
  const bookProducts = useProducts(context, { category: 'book' });
  const shoesProducts = useProducts(context, { category: 'shoes' });

  return (
    <Flex paddingbottom="16px" justifycontent="center" flexdirection="column">
      <Box paddingleft="16px" paddingright="16px" width="100%">
        <Text variant="large">의류</Text>
        {renderProductCardCarousel(clothesProducts.data)}
      </Box>
      <Box paddingleft="16px" paddingright="16px" width="100%" overflowx="scroll">
        <Text variant="large">도서</Text>
        {renderProductCardCarousel(bookProducts.data)}
      </Box>
      <Box paddingleft="16px" paddingright="16px" width="100%" overflowx="scroll">
        <Text variant="large">신발</Text>
        {renderProductCardCarousel(shoesProducts.data)}
      </Box>
    </Flex>
  );
};

export default MainContent;
