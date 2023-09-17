'use client';

// import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
// import getAllProducts from '../../services/get-all-products';
import getAllProducts from '@/app/services/get-all-products';
import type { Product, User, ApiContext } from '@/app/types';
import getAllUser from '@services/users/get-all-users';
// ssg 생성되지 않은 페이지 접근시 작업 여부를 제어.
export const dynamicParams = false;

interface IUserParams {
  id: string;
  user: User;
  product: Product[];
}

// 빌드 시 생성할 path를 생성한다.
// getStaticPaths
export async function generateStaticParams() {
  // const url = process.env.API_BASE_URL || 'http://127.0.0.1:5000';
  const url = 'http://127.0.0.1:5000';
  const context: ApiContext = {
    apiRootUrl: url,
  };

  const users = await getAllUser(context);
  const paths = users.map((user: User) => ({ id: String(user.id) })); // [ { id : ''}, ...]
  return paths;
}

/**
 * id를 가지고 사용자 정보 및 구매 이력을 반환한다.
 * @param id 사용자 아이디
 */
function getProductList(id: string) {
  return getAllProducts({ apiRootUrl: 'http://127.0.0.1:5000' }, { id: Number(id) }); // throw Promise or Product[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Product = ({ products }: any) => {
  const product = products.read();
  return <div>데이터 불러옴. {product.length}</div>;
};

export default function Page({ params }: { params: IUserParams }) {
  return (
    <div>
      <Suspense fallback={<p>데이터 가져온다굿...</p>}>
        <Product products={getProductList(params.id)} />
      </Suspense>
    </div>
  );
}
