import useSWR from 'swr';
import type { ApiContext, User } from '@/app/types';
import { fetcher } from '@/app/utils/fetcher';
import { isNull } from '@/app/utils/utils';

export interface IUseUserProps {
  /**
   * 취득할 사용자 ID
   */
  id: string;
  /**
   * 초기 상태
   */
  initial?: User;
}

export interface IUseUser {
  /**
   * 취득할 사용자
   */
  user?: User;
  /**
   * 로드 플레그
   */
  isLoading: boolean;
  /**
   * 에러 플러그
   */
  isError: boolean;
}

const useUser = (context: ApiContext, { id, initial }: IUseUserProps) => {
  // 책의 내용이 잘못된 부분이 많음 useSWR을 사용시 첫번째 인자에는 데이터를 조회하기 위한 서버 주소, 두번째 인자는 fetch함수를 지정해야함.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    fetcher,
  );

  return {
    user: data ?? initial,
    isLoading: !error && isNull(data),
    isError: !!error, // error가 undefined가 아닐 경우 !!을 사용하면 true이다.
  };
};

export default useUser;
