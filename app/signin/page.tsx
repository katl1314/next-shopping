'use client';

import type { NextPage, Metadata } from 'next';
import { useSearchParams, useRouter } from 'next/navigation';

import SigninFormController from '@/app/controllers/SigninFormController';
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // 인증 후 이벤트 핸들러
  const handleSignin = (err?: Error) => {
    // error가 undefined이면 루트로 리다이렉트한다...
    // 이전에 접속한곳에서 로그인을 성공하면 이전에 접속한 루트를 아느것이 중요할듯...

    if (!err) {
      const redirectTo = searchParams.has('redirect_to')
        ? `${searchParams.get('redirect_to')}`
        : '/';
      router.push(redirectTo);
    }
  };
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
            <SigninFormController onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SigninPage;
