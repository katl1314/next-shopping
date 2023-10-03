import purchase from '@/app/services/purchase';
import type { ApiContext, Product } from '@/app/types';
import CartProduct from '@components/organisms/CartProduct';
import { useGlobalSpinnerActionsContext } from '@context/GlobalSpinnerContext';
import { useShoppingCartContext } from '@context/ShoppingCartContext';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

const CartContainer = () => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext();
  const { carts, removeProductToCart } = useShoppingCartContext();

  // 삭제 버튼 클릭시
  const handleRemoveButtonClick = (product: Product) => {
    removeProductToCart(product);
  };

  // 구매 버튼 클릭시
  const handleBuyButtonClick = async (product: Product) => {
    try {
      setGlobalSpinner(true); // 스피너 표시
      await purchase(context, { productId: product.id });
      window.alert('구매 완료');
      removeProductToCart(product);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    } finally {
      setGlobalSpinner(false); // 해당 함수의 처리가 완료되면 반드시 setGlobalSpinner false로...
    }
  };

  return (
    <>
      {carts.map((cart: Product, index: number) => (
        <CartProduct
          product={cart}
          key={index}
          onBuyButtonClick={handleBuyButtonClick}
          onRemoveButtonClick={handleRemoveButtonClick}
        />
      ))}
    </>
  );
};

export default CartContainer;
