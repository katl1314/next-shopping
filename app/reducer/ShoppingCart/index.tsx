import type { Product } from '../../types';

export enum ShoppingActionType {
  ADD_SHOPPING_CART = 'add_shopping_cart',
  REMOVE_SHOPPING_CART = 'remove_shopping_cart',
}

interface Action {
  type: ShoppingActionType;
  product: Product;
}

interface IState {
  carts: Product[];
}

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case ShoppingActionType.ADD_SHOPPING_CART:
      return {
        carts: [...state.carts, action.product],
      };
    case ShoppingActionType.REMOVE_SHOPPING_CART: {
      const id = action.product.id;
      const carts = state.carts.filter(cart => cart.id !== id);
      return {
        carts,
      };
    }
    default:
      throw new Error(`${action.type} is not define`);
  }
}

export default reducer;
