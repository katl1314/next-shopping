'use client';

import { NextPage } from 'next';
import Flex from './components/layout/Flex';
import type { Product } from './types';

interface IHomePageProps {
  bookProducts: Product[];
  clothesProducts: Product[];
  shoesProducts: Product[];
}

const HomePage: NextPage<IHomePageProps> = () => {
  // 상품 카드 캐러셀 => getStaticProps을 호출하여 미리 생성해두는 방식 => next13에서는 fetch로 처리한다. (next: { revalidate: 10})

  return <Flex></Flex>;
};

export default HomePage;
