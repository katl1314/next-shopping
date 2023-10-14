/**
 * 상품 등록 페이지
 */
'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import ProductFormContainer from '@/app/containers/ProductFormContainer';
import AppLogo from '@components/atoms/AppLogo';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';

const Page: NextPage = () => {
  const { push } = useRouter();
  const handleSave = (err?: Error) => {
    // 지정한 경로로 페이지를 이동한다.
    if (!err) {
      push(`/users/${1}`);
    }
  };

  return (
    <Flex
      paddingtop={{ base: '8px', md: '32px' }}
      paddingbottom={{ base: '8px', md: '32px' }}
      paddingleft={{ base: '8px', md: '0px' }}
      paddingright={{ base: '8px', md: '0px' }}
      justifycontent="center"
    >
      <Flex width="800px" flexdirection="column" justifycontent="center" alignitems="center">
        <Box display={{ base: 'none', md: 'bock' }} marginbottom="8px">
          <AppLogo />
        </Box>
        <Box width="100%">
          <ProductFormContainer onSave={handleSave} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Page;
