'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ProductCard from '@/app/components/organisms/ProductCard';
import UserProfile from '@/app/components/organisms/UserProfile';
import AddToCartButtonContainer from '@/app/containers/AddToCartButtonContainer';
import getAllProducts from '@/app/services/get-all-products';
import { useProduct } from '@/app/services/products/use-product';
import useUser from '@/app/services/users/use-user';
import type { Category, ApiContext, Product, User } from '@/app/types';

import BreadcrumbItem from '@components/atoms/BreadcrumbItem';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';
import Breadcrumb from '@components/molecules/BreadCrumb';

const categoryNameDict: Record<Category, string> = {
  shoes: '신발',
  clothes: '의류',
  book: '책',
};

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

type ProductPageProps = {
  id: string;
  product: Product;
};

const ProductPage: NextPage<ProductPageProps> = () => {
  const { id } = useParams();
  const data = useProduct(context, id as string);
  const user = useUser(context, { id: String(data.data.owner) });
  const router = useRouter();

  // 카트에 상품이 추가되면 카트 페이지로 고고싱
  const handleAddToCartButtonClick = () => {
    router.push('/cart');
  };

  const product = data.data ?? ({} as Product);

  return (
    <Flex
      paddingtop="16px"
      paddingbottom="16px"
      paddingleft={{ base: '16px', md: '0px' }}
      paddingright={{ base: '16px', md: '0px' }}
    >
      <Box>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">톱</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/search">검색</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/search/${product.category}`}>{categoryNameDict[product.category]}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex paddingtop="16px" paddingbottom="8px" justifycontent="center">
          <ProductCard {...product} variant="detail" />
        </Flex>
        <Box>
          <Text variant="large">게시자</Text>
          <Link href={`/users/${product.owner}`}>
            <UserProfile {...(user.user ?? ({} as User))} />
          </Link>
        </Box>
      </Box>
      <Box padding="16px" width={{ base: '100%', md: '700px' }}>
        <Flex
          justifycontent="space-between"
          flexdirection="column"
          height={{ base: '', md: '100%' }}
        >
          <Box>
            {product.description?.split('\n').map((text: string, i: number) => (
              <Text key={i} variant="medium">
                {text}
              </Text>
            ))}
          </Box>
          <AddToCartButtonContainer
            product={product}
            onAddToCartButtonClick={handleAddToCartButtonClick}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export async function generateStaticParams() {
  const products = await getAllProducts(context);
  return products.map(product => ({ id: product.id }));
}

export default ProductPage;
