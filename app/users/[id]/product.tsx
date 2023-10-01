import ProductCard from '@/app/components/organisms/ProductCard';
import type { Product } from '@/app/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductView = ({ products }: { products: Product[] | null }) => {
  // products.read호출 시 pending상태이면 fallback을 실행한다.
  if (products === null) {
    return <div>등록한 제품 정보가 없습니다.</div>;
  }

  return (
    <div>
      {products.map(({ id, ...props }: Product) => {
        return <ProductCard {...props} key={id} />;
      })}
    </div>
  );
};

export default ProductView;
