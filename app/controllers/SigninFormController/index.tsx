'use client';
import { useAuthContext } from '@/app/context/AuthContext';
import { useGlobalSpinnerActionsContext } from '@/app/context/GlobalSpinnerContext';
import SigninForm from '@components/organisms/SigninForm';

interface ISinginFormControllerProps {
  /**
   * 로그인 했을때 호출하는 이벤트 핸들러
   * @param err 에러 객체
   * @returns
   */
  onSignin: (err?: Error) => void;
}

const SigninFormController = ({ onSignin }: ISinginFormControllerProps) => {
  const { signIn } = useAuthContext();
  // 스피너 표시 여부를 제어하는 함수를 Context에서 받는다.
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const handleSignin = async (username: string, password: string) => {
    try {
      // 로딩 스피너 표시함.
      setGlobalSpinner(true);
      await signIn(username, password);
      onSignin();
    } catch (err) {
      onSignin(err as Error);
    } finally {
      // finally문은 try문에서 오류가 발생하여 catch문을 실행해도 반드시 실행함.
      setGlobalSpinner(false); // 함수 실행 종료시 spinner또한 표시하지 않는다.
    }
  };

  return <SigninForm onSignin={handleSignin} />;
};

export default SigninFormController;
