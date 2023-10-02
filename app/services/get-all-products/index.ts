import { HTTPMethod } from '..';
import type { ApiContext, Product } from '@/app/types';

const getAllProducts = async (context: ApiContext, id?: string) => {
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

  const params = new URLSearchParams();
  let path = `${context.apiRootUrl}/products`;
  if (id) {
    params.append('owner', id);
    path = `${context.apiRootUrl}/products?${params.toString()}`;
  }
  const promise = await fetch(path, requestConfig);
  const response = (await promise.json()) as Product[];
  return await response;
};

export default getAllProducts;
