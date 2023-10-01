import type { Category, Condition } from '@/app/types';

/**
 * 검색 쿼리
 */
interface ProductCardListContainerProps {
  /**
   * category: 카테고리 (undefined이면 모두)
   * condition : 제품 상태
   */
  category?: Category;
  conditions?: Condition[];
}

const ProductCardListContainer = (props: ProductCardListContainerProps) => {
  console.log(props);
  return <></>;
};

export default ProductCardListContainer;
