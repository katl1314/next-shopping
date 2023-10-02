// 추가 버튼 클릭 시 카트에 넣기 위한 컴포넌트
// 카트에 같은 상품이 존재하는지 검사가 필요함.

import Button from '@/app/components/atoms/Button';
import { useShoppingCartContext } from '@/app/context/ShoppingCartContext';
import type { Product } from '@/app/types';

export interface AddToCartButtonContainer {
  /**
   * 카트에 추가하고자 하는 상품
   */
  product: Product;
  /**
   * 카트에 추가하기 위한 이벤트
   * @param event 클릭 이벤트
   * @returns
   */
  onAddToCartButtonClick: (product: Product) => void;
}

const AddToCartButtonContainer = ({
  product,
  onAddToCartButtonClick,
}: AddToCartButtonContainer) => {
  const { carts, addProductToCart } = useShoppingCartContext();

  const handleAddCartButtonClick = () => {
    const productId = product.id;
    // 카트에 존재하는 제품의 id와 productid를 비교하여 첫번째 결과물이 있으면 0 이상, 없으면 -1을 반환한다.
    const result = carts.findIndex(v => v.id == productId);
    if (result === -1) {
      // 카트에 항목이 없으므로...
      addProductToCart(product);
    }

    onAddToCartButtonClick && onAddToCartButtonClick(product);
  };
  return (
    <Button width={{ base: '100%', md: '400px' }} height="66px" onClick={handleAddCartButtonClick}>
      카트에 추가
    </Button>
  );
};

export default AddToCartButtonContainer;
