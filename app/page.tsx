import { NextPage } from 'next';
import Text from './components/atoms/Text';
import Box from './components/layout/Box';
import Flex from './components/layout/Flex';
import type { Product } from './types';

interface IHomePageProps {
  bookProducts: Product[];
  clothesProducts: Product[];
  shoesProducts: Product[];
}

const HomePage: NextPage<IHomePageProps> = ({
  bookProducts,
  clothesProducts,
  shoesProducts,
}: IHomePageProps) => {
  // 상품 카드 캐러셀 => getStaticProps을 호출하여 미리 생성해두는 방식
  console.info(bookProducts, clothesProducts, shoesProducts);
  // const renderProductCardCarousel = (products: Product[]) => {};

  return (
    <>
      <Flex padding="16px" justifycontent="center" backgroundcolor="primary">
        <Flex width="100%" justifycontent="center" alignitems="center" flexdirection="column">
          <Box width="100%">
            <Text marginbottom="4px" lineheight="2" color="white" variant="extraLarge">
              Gihyo C2C에서
            </Text>
            <Text marginbottom="4px" lineheight="2" color="white" variant="extraLarge">
              마음에 드는 아이템을 찾자.
            </Text>
          </Box>
          <Box width="100%">
            <Text color="white" variant="mediumLarge">
              Gihyo C2C는 실전적인 Next.js 애플리케이션 개발에서 사용되는 데모 애플리케이션입니다.
            </Text>
          </Box>
        </Flex>
      </Flex>
      {/* 상품 소개 */}
      <Flex paddingbottom="16px" justifycontent="center">
        <Box paddingleft="16px" paddingright="16px" width="100%">
          <Text variant="large">의류</Text>
        </Box>
      </Flex>
      <Flex paddingbottom="16px" justifycontent="center">
        <Box paddingleft="16px" paddingright="16px" width="100%">
          <Text variant="large">도서</Text>
        </Box>
      </Flex>
      <Flex paddingbottom="16px" justifycontent="center">
        <Box paddingleft="16px" paddingright="16px" width="100%">
          <Text variant="large">신발</Text>
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;
