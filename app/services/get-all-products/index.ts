import { HTTPMethod, PromiseState } from '..';
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

  return wrapPromise<Product>(promise);
};

function wrapPromise<T>(promise: Promise<T>) {
  let status = PromiseState.Pending;
  let response: T | null = null;

  const suspense = promise.then(
    res => {
      // success
      status = PromiseState.Success;
      response = res;
    },
    err => {
      status = PromiseState.Fail;
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case PromiseState.Pending:
        throw suspense;
      case PromiseState.Fail:
        throw response;
      case PromiseState.Success:
        return response;
    }
  };

  return { read };
}

export default getAllProducts;
