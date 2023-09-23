import { HTTPMethod, promiseResolver } from '..';
import type { ApiContext, Product } from '@/app/types';

const getAllProducts = (context: ApiContext, id: string) => {
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
  const promise = fetch(`${context.apiRootUrl}/products?owner=${id}`, requestConfig)
    .then(response => response.json())
    .then(response => response);

  return promiseResolver<Product>(promise);
};

export default getAllProducts;
