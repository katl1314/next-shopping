import React, { createContext, useContext, useReducer } from 'react';
import type { Product } from '../../types';
import reducer, { ShoppingActionType } from '@/app/reducer/ShoppingCart';

interface ShoppingCartProps {
  // 카트 리스트
  carts: Product[];
  // 제품을 카트에 추가
  addProductToCart: (product: Product) => void;
  // product id를 받아서 cart에서 삭제한다.
  removeProductToCart: (product: Product) => void;
}

// 쇼핑 카트 컨텍스트를 생성한다.
const ShoppingCartContext = createContext<ShoppingCartProps>({
  carts: [],
  addProductToCart: () => {},
  removeProductToCart: () => {},
});

// 생성한 컨텍스트의 값을 사용할 때 useContext를 호출해주는 함수
export const useShoppingCartContext = (): ShoppingCartProps => useContext(ShoppingCartContext);

interface ShoppingCartProviderProps {
  children?: React.ReactElement;
}

/**
 * 쇼핑 카트 컨텍스트 제공자
 */
const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  // useReducer(reducer, initState);
  const [shoppingCarts, dispatch] = useReducer(reducer, { carts: [] });

  const handleAddProductToCart = (product: Product) => {
    // dispatch내 action을 삽입함으로써, reducer에서 action을 분기하여 각각 처리한다.
    dispatch({ type: ShoppingActionType.ADD_SHOPPING_CART, product });
  };

  const handleRemoveProductToCart = (product: Product) => {
    dispatch({ type: ShoppingActionType.REMOVE_SHOPPING_CART, product });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        carts: shoppingCarts.carts,
        addProductToCart: handleAddProductToCart,
        removeProductToCart: handleRemoveProductToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
