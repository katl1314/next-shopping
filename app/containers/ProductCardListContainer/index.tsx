import Link from 'next/link';
import Box from '@/app/components/layout/Box';
import MyLoader from '@/app/components/loading/loader';
import ProductCard from '@/app/components/organisms/ProductCard';
import ProductCardList from '@/app/components/organisms/ProductCardList';
import useSearch from '@/app/services/products/use-search';
import type { Category, Condition, ApiContext } from '@/app/types';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

/**
 * 검색 쿼리
 */
export interface ProductCardListContainerProps {
  /**
   * category: 카테고리 (undefined이면 모두)
   * condition : 제품 상태
   */
  category?: Category;
  conditions?: Condition[];
}

const ProductCardListContainer = ({ category, conditions }: ProductCardListContainerProps) => {
  const { products, isLoading } = useSearch(context, { category, conditions });

  return (
    <ProductCardList>
      {/* 로딩 중일 때 RectLoader를 그린다. */}
      {isLoading &&
        Array.from(Array(16), (_, k) => (
          <Box key={k}>
            <Box display={{ base: 'none', md: 'block' }}>
              <MyLoader />
            </Box>
            <Box display={{ base: 'none', md: 'block' }}>
              <MyLoader />
            </Box>
          </Box>
        ))}
      {!isLoading &&
        products.map(p => (
          <Box key={p.id}>
            <Link href={`/products/${p.id}`}>
              <ProductCard
                variant="listing"
                title={p.title}
                price={p.price}
                imageUrl={p.imageUrl}
              />
            </Link>
          </Box>
        ))}
    </ProductCardList>
  );
};

export default ProductCardListContainer;
