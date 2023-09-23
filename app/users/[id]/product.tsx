import ProductCard from '@/app/components/organisms/ProductCard';
import type { Product } from '@/app/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductView = ({ products }: any) => {
  const productList = products.read();
  // products.read호출 시 pending상태이면 fallback을 실행한다.
  if (productList.length < 1) {
    return <div>등록한 제품 정보가 없습니다.</div>;
  }

  return (
    <div>
      {productList.map(({ id, ...props }: Product) => {
        return <ProductCard {...props} key={id} />;
      })}
    </div>
  );
};

export default ProductView;
