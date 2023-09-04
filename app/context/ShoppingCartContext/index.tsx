import React, { useContext, createContext, useState } from 'react';
import type { Product } from '../../types';

interface ShoppingCartProps {
  // 카트 리스트
  carts: Product[];
  // 제품을 카트에 추가
  addProductToCart: (product: Product) => void;
  // product id를 받아서 cart에서 삭제한다.
  removeProductToCart: (id: number) => void;
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
  const [carts, setCarts] = useState<Product[]>([]);

  const handleAddProductToCart = (product: Product) => {};

  const handleRemoveProductToCart = (id: number) => {};

  return (
    <ShoppingCartContext.Provider
      value={{
        carts,
        addProductToCart: handleAddProductToCart,
        removeProductToCart: handleRemoveProductToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
