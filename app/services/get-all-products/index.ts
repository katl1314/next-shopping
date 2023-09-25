import { HTTPMethod } from '..';
import type { ApiContext } from '@/app/types';

const getAllProducts = async (context: ApiContext, id: string) => {
  const requestConfig = {
    method: HTTPMethod.Get,
    header: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    next: {
      revalidate: 10, // ISR => 10초마다 조회한다.
    },
  };
  const promise = await fetch(`${context.apiRootUrl}/products?owner=${id}`, requestConfig);
  const response = await promise.json();
  return await response;
};

export default getAllProducts;
