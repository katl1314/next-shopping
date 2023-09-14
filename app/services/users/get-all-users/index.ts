import { HTTPMethod } from '../..';
import type { ApiContext } from '@/app/types';

const getAllUser = async (context: ApiContext) => {
  const resolve = await fetch(`${context.apiRootUrl}/users`, {
    cache: 'force-cache',
    method: HTTPMethod.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await resolve.json();

  return data;
};

export default getAllUser;
