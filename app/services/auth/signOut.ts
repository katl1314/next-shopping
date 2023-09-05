// 로그인

import { HTTPMethod } from '..';
import { ApiContext } from '@/app/types/data';
import { fetcher } from '@/app/utils/fetcher';
/**
 * 인증 API(로그아웃)
 * @param context api콘텍스트
 * @param params 파라미터
 * @return 로그인 사용자
 */
const signOut = async (context: ApiContext, id: number): Promise<boolean> =>
  await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/auth/signOut/${id}`, {
    method: HTTPMethod.Get, // 서버 HTTP 메서드
  });

export default signOut;
