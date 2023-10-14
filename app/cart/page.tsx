'use client';
/**
 * 카트에 대한 페이지 컴포넌트
 */
import type { NextPage } from 'next';
import Link from 'next/link';
import CartContainer from '../containers/CartContainer';
import useAuthGuard from '../hook/UseAuthGuard';
import BreadcrumbItem from '@components/atoms/BreadcrumbItem';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';
import Breadcrumb from '@components/molecules/Breadcrumb';

const CartPage: NextPage = () => {
  useAuthGuard();

  return (
    <Flex
      paddingtop="16px"
      paddingbottom="16px"
      paddingleft={{ base: '16px', md: '0px' }}
      paddingright={{ base: '16px', md: '0px' }}
      justifycontent="center"
    >
      <Box width="1240px">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">톱</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/cart">카트</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box>
          <Text variant="large">카트</Text>
          {/* 카트 컨테이너
          카트에 있는 상품을 표시, 구입, 삭제 */}
          <CartContainer />
        </Box>
      </Box>
    </Flex>
  );
};

// export function generateMetadata() {
//   return {
//     title: '카트',
//   };
// }

export default CartPage;
