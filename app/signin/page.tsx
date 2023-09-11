import type { NextPage, Metadata } from 'next';
import SigninLayout from '../views/SigninLayout';
import AppLogo from '@components/atoms/AppLogo';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';

// 정적인 메타데이터 객체를 만든다.
export function generateMetadata(): Metadata {
  return {
    title: '로그인',
  };
}

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
            {/* SigninForm의 username, password를 받아 signin함수에서 username, password를 통해 api를 호출한다. 인증 결과는 props의 onSignin을 통해 이벤트에 전파. */}
            <SigninLayout />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SigninPage;
