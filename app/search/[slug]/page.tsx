'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BreadcrumbItem from '@/app/components/atoms/BreadcrumbItem';
// import Text from '@/app/components/atoms/Text';
import Box from '@/app/components/layout/Box';
import Flex from '@/app/components/layout/Flex';
import Breadcrumb from '@/app/components/molecules/BreadCrumb';
import { Category } from '@/app/types';

// Record<리터럴 타입(Key), VALUE에 들어갈 타입>
// 리터럴 타입은 인덱스 시그니처로 사용 불가
const categoryNameDist: Record<Category, string> = {
  book: '책',
  clothes: '의류',
  shoes: '신발',
};

const SearchPage: NextPage = () => {
  const { slug } = useParams() as { slug: Category | Category[] }; // path
  console.log(slug);
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
      <Flex flexdirection={{ base: 'column', md: 'row' }}></Flex>
    </Box>
  );
};

export default SearchPage;
