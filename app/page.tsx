import { NextPage } from 'next';
import Text from './components/atoms/Text';
import Box from './components/layout/Box';
import Flex from './components/layout/Flex';
import MainContent from './page.client';
import type { Product } from './types';

interface IHomePageProps {
  bookProducts: Product[];
  clothesProducts: Product[];
  shoesProducts: Product[];
}

const HomePage: NextPage<IHomePageProps> = () => {
  return (
    <>
      <Flex padding="16px" justifycontent="center" backgroundcolor="primary">
        <Flex width="100%" justifycontent="center" alignitems="center" flexdirection="column">
          <Box width="100%">
            <Text marginbottom="4px" color="white" variant="medium">
              Gihyo C2C에서
            </Text>
            <Text marginbottom="4px" color="white" variant="medium">
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
      <MainContent />
    </>
  );
};

export default HomePage;
