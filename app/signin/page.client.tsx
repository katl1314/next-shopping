'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import SigninFormController from '@/app/controllers/SigninFormController';

const SigninPageClient = () => {
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

  return <SigninFormController onSignin={handleSignin} />;
};

export default SigninPageClient;
