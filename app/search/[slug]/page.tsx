'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import BreadcrumbItem from '@/app/components/atoms/BreadcrumbItem';
import Text from '@/app/components/atoms/Text';
import Box from '@/app/components/layout/Box';
import Flex from '@/app/components/layout/Flex';
import Breadcrumb from '@/app/components/molecules/BreadCrumb';
import ProductCardListContainer from '@/app/containers/ProductCardListContainer';
import { Category, Condition } from '@/app/types';

// Record<리터럴 타입(Key), VALUE에 들어갈 타입>
// 리터럴 타입은 인덱스 시그니처로 사용 불가
const categoryNameDist: Record<Category, string> = {
  book: '책',
  clothes: '의류',
  shoes: '신발',
};

const SearchPage: NextPage = () => {
  // uri중 params을 반환한다.
  const { slug } = useParams() as { slug: Category }; // path
  const query = useSearchParams(); // condition
  const conditions = query.getAll('conditions') as Condition[]; // query[]

  return (
    <Box
      paddingleft={{ base: '8px', md: '16px' }}
      paddingright={{ base: '8px', md: '16px' }}
      paddingtop="8px"
      paddingbottom="8px"
    >
      <Box margintop="4px">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Top</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/search">검색</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {typeof slug === 'string' && (
              <Link href={`/search/${slug}`}>{categoryNameDist[slug]}</Link>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      {/* 
        flex-direction: flex container에서 아이템을 어찌 배치할꼬?
        column => 세로로 합니다
        row => 가로로 합시다.
      */}
      <Flex flexdirection={{ base: 'column', md: 'row' }}>
        {/* aside start */}
        <Box minwidth="200px" marginbottom={{ base: '8px', md: '4px' }}>
          <Box paddingtop="4px">
            <Text fontWeight="bold" variant="mediumLarge">
              카테고리
            </Text>
            <Box>
              <Link href="/search/all">모두</Link>
            </Box>
            {Object.keys(categoryNameDist).map((category: string, index: number) => (
              <Box key={index} margintop="4px">
                <Link href={`/search/${category}`} replace>
                  <Text fontWeight={category === slug ? 'bold' : 'normal'}>
                    {categoryNameDist[category as Category]}
                  </Text>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
        {/* aside end */}

        {/* content start */}
        <Box>
          <Text display={{ base: 'block', md: 'none' }} fontWeight="bold" variant="mediumLarge">
            상품 목록
          </Text>
          {/* 
            상품 카드 리스트 컨테이너
            상품 쿼리로부터 상품 카드 리스트를 표시한다.
          */}
          <ProductCardListContainer category={slug} conditions={conditions} />
        </Box>
        {/* content end */}
      </Flex>
    </Box>
  );
};

export default SearchPage;
