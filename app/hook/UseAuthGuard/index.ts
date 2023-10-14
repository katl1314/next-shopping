'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';

const useAuthGuard = () => {
  const { push } = useRouter(); // push navigation stack에 지정한 페이지를 추가한다.
  const { authUser } = useAuthContext(); // createContext에 저장된 값을 가져온다.
  const pathname = usePathname(); // 현재 pathname정보를 반환한다.

  useEffect(() => {
    if (!authUser) {
      // 사용자 정보를 얻을 수 없는 경우
      const query = new URLSearchParams();
      query.set('redirect_to', pathname);
      push(`/signin?${query.toString()}`);
    }
  }, [authUser, pathname, push]);
};

export default useAuthGuard;
