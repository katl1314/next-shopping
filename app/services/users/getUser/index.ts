import { HTTPMethod } from '../..';
import { ApiContext, User } from '@/app/types/data';
import { fetcher } from '@/app/utils/fetcher';

export interface GetUserParams {
  /**
   * 사용자 id
   */
  id: string;
}

/**
 * 사용자 API 조회(개별 취득)
 * Promise의 제네릭 변수에 User타입을 전달한다.
 * @param Api 컨텍스트
 * @param params 파라미터
 * @return 사용자 (json데이터)
 * {
 *    id: number; // 사용자 아이디
 *    username: string; // 사용자 이름
 *    displayName: string; // 닉네임
 *    email: string; // 이메일
 *    profileImageUrl: string; // 프로필 이미지
 *    description: string; // 자기소개
 * }
 */
const getUser = async (context: ApiContext, params: GetUserParams): Promise<User> =>
  await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/users/${params.id}`, {
    method: HTTPMethod.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export default getUser;
