'use client';

// import { useRouter, useSearchParams, useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SigninFormController from '@/app/controllers/SigninFormController';

const SigninLayout = () => {
  const router = useRouter();

  // 인증 후 이벤트 핸들러
  const handleSignin = async (err?: Error) => {
    // error가 undefined이면 루트로 리다이렉트한다...
    // 이전에 접속한곳에서 로그인을 성공하면 이전에 접속한 루트를 아느것이 중요할듯...
    if (!err) {
      const redirectTo = '/';
      await router.push(redirectTo);
    }
  };
  return <SigninFormController onSignin={handleSignin} />;
};

export default SigninLayout;
