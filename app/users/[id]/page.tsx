// import { useRouter, useSearchParams } from 'next/navigation';
// import Box from '@/app/components/layout/Box';
// import Flex from '@/app/components/layout/Flex';
import type { Product, User } from '@/app/types';
// import getAllUser from '@services/users/get-all-users';
// ssg 생성되지 않은 페이지 접근시 작업 여부를 제어.
export const dynamicParams = false;

interface IUserParams {
  id: string;
  user: User;
  product: Product[];
}

// 빌드 시 생성할 path를 생성한다.
export async function generateStaticParams() {
  // const url = process.env.API_BASE_URL || 'http://localhost:5000';
  // const url = 'http://localhost:5000';
  // const context: ApiContext = {
  //   apiRootUrl: url,
  // };

  // const users = await getAllUser(context);
  // const paths = users.map((user: User) => ({ id: user.id })); // [ { id : ''}, ...]
  // return paths;

  return [{ id: '1' }, { id: '2' }]; // [id]처럼 generateStaticParams통해 동적으로 경로를 생성할 때 반드시 문자열로?
}

export default function Page({ params }: { params: IUserParams; children?: React.ReactNode }) {
  // const router = useRouter();
  // const searchParams = useSearchParams(); // url의 querystring을 받을 수 있다.

  // console.log(router, params, searchParams);
  // return (
  //   <Flex
  //     paddingtop="10px"
  //     paddingbottom="10px"
  //     paddingleft={{ base: '10px', md: '5' }}
  //     paddingright={{ base: '10px', md: '5' }}
  //   >
  //     <Box width="1180px">
  //       <Box margintop="10px">테스트</Box>
  //       <Box>
  //         <Box marginbottom="5px"></Box>
  //       </Box>
  //     </Box>
  //   </Flex>
  // );
  console.log(params);
  return <div>테스트</div>;
}
