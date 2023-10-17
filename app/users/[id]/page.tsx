// ssg 생성되지 않은 페이지 접근시 작업 여부를 제어.
export const dynamicParams = false;

import ProductView from './product';
import Box from '@/app/components/layout/Box';
import Flex from '@/app/components/layout/Flex';
import UserProfileContainer from '@/app/containers/UserProfileContainer';
import getAllProducts from '@/app/services/get-all-products';
import getUser from '@/app/services/users/getUser';
import type { Product, User, ApiContext } from '@/app/types';
import getAllUser from '@services/users/get-all-users';

//const url = process.env.NEXT_PUBLIC_API_BASE_PATH ?? 'http://127.0.0.1:5000';
const url = process.env.API_BASE_URL ?? 'https://varied-valene-choiminhyeok.koyeb.app';

interface IUserParams {
  id: string;
  user: User;
  product: Product[];
}

// 빌드 시 생성할 path를 생성한다. getStaticPaths
export async function generateStaticParams() {
  const context: ApiContext = {
    apiRootUrl: url,
  };

  const users = await getAllUser(context);
  const paths = users.map((user: User) => ({ id: String(user.id) })); // [ { id : ''}, ...]
  return paths;
}

function getProductList(id: string) {
  return getAllProducts({ apiRootUrl: url }, id); // throw Promise or Product[]
}

function getUserInfo(id: string) {
  return getUser({ apiRootUrl: url }, id);
}

export default async function Page({ params }: { params: IUserParams }) {
  const products: Product[] = await getProductList(params.id);
  return (
    <Flex
      paddingtop="16px"
      paddingbottom="16px"
      paddingleft={{ base: '16px', md: '4px' }}
      paddingright={{ base: '16px', md: '4px' }}
      justifycontent="center"
    >
      <Box width="1180px">
        <Box marginbottom="8px">
          <UserProfileContainer user={getUserInfo(params.id)} />
        </Box>
        <Box marginbottom="8px">
          <ProductView products={products} />
        </Box>
      </Box>
    </Flex>
  );
}
