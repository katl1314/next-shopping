import type { Metadata, NextPage } from 'next';
import SigninPageClient from './page.client';

import AppLogo from '@components/atoms/AppLogo';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';
const SigninPage: NextPage = () => {
  return (
    <Box>
      <Flex
        paddingtop="16px"
        paddingbottom="16px"
        paddingleft={{ base: '16px', md: '0px' }}
        paddingright={{ base: '16px', md: '0px' }}
        justifycontent="center"
      >
        <Flex width="400px" flexdirection="column" justifycontent="center" alignitems="center">
          <Box margintop="16px">
            <AppLogo />
          </Box>
          <Box width="100%">
            <SigninPageClient />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export const metadata: Metadata = {
  title: '로그인',
};

export default SigninPage;
