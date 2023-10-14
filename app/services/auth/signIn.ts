// 로그인

import { HTTPMethod } from '..';
import { ApiContext, User } from '@/app/types/data';
import { fetcher } from '@/app/utils/fetcher';

export interface ISigninParams {
  /**
   * 사용자명
   */
  readonly username: string;
  /**
   * 비밀번호
   */
  readonly password: string;
}

/**
 * 인증 API(로그인)
 * @param context api콘텍스트
 * @param params 파라미터
 * @return 로그인 사용자
 */
const signIn = async (context: ApiContext, params: ISigninParams): Promise<User> =>
  await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/signin`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'applicaiton/json',
    },
    method: HTTPMethod.Post, // 서버 HTTP 메서드
    body: JSON.stringify(params), // post방식으로 전달되는 데이터
  });

export default signIn;
