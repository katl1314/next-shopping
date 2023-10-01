import { HTTPMethod, promiseResolver } from '../..';

import type { ApiContext, User } from '@/app/types';

const getAllProducts = (context: ApiContext, id: string) => {
  const requestConfig = {
    method: HTTPMethod.Get,
    header: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const promise = fetch(`${context.apiRootUrl}/users/${id}`, requestConfig)
    .then(response => response.json())
    .then(response => response);

  return promiseResolver<User>(promise);
};

export default getAllProducts;
