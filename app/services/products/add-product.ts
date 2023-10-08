import { HTTPMethod } from '..';
import { ApiContext, Product } from '@/app/types';
import { fetcher } from '@/app/utils/fetcher';

/**
 * 인증 API(로그인)
 * @param context api콘텍스트
 * @param params 파라미터
 * @return 로그인 사용자
 */
const addProduct = async (
  context: ApiContext,
  params: { product: Omit<Product, 'id'> },
): Promise<Product> => {
  const result = await fetcher<Product>(`${context.apiRootUrl.replace(/\/$/g, '')}/products`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: HTTPMethod.Post, // 서버 HTTP 메서드
    body: JSON.stringify(params.product), // post방식으로 전달되는 데이터
  });

  return result;
};

export default addProduct;
