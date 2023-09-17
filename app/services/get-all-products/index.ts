import { HTTPMethod, promiseResolver } from '..';
import type { ApiContext, Product } from '@/app/types';

const getAllProducts = (context: ApiContext, params: { id: number }) => {
  const requestConfig = {
    next: {
      revalidate: 10, // ISR
      method: HTTPMethod.Get, // HTTP 통신 방식 GET, POST, PATCH, PUT, DELETE
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  };
  const promise = fetch(`${context.apiRootUrl}/products?owner=${params.id}`, requestConfig)
    .then(response => response.json())
    .then(response => response);

  return promiseResolver<Product>(promise);
};

export default getAllProducts;
