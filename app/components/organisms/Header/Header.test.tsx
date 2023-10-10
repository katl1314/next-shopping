import { RenderResult, screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from '.';
import { AuthContextProvider } from '@/app/context/AuthContext';
import { useShoppingCartContext } from '@/app/context/ShoppingCartContext';
import theme from '@/app/theme';
import type { Product } from '@/app/types';

const product: Product[] = [
  {
    id: 0,
    category: 'shoes',
    title: '제목제목',
    description: '설명설명',
    imageUrl: '',
    blurDataUrl: '',
    price: 35000,
    condition: 'new',
    owner: 1, // User.id
  },
];

describe('Header', () => {
  let renderResult: RenderResult;
  const useShoppingCartContextMock = useShoppingCartContext as jest.MockedFunction<
    typeof useShoppingCartContext
  >;

  it('카트에 상품이 존재', async () => {
    // Mock 모의함수 jest.fn을 호출한다.
    // 모의 함수가 호출되면 carts, addProductToCart, removeProductToCart가 들어있는 객체를 반환한다.
    useShoppingCartContextMock.mockReturnValue({
      carts: product,
      addProductToCart: () => {},
      removeProductToCart: () => {},
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
          <Header />
        </AuthContextProvider>
      </ThemeProvider>,
    );
    // data-testid가 badge-wrapper인 요소를 모두 찾아서 길이를 반환하고, toBeGreaterThan을 통해 0보다 큰지 검사한다.
    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0);
    renderResult.unmount();
    useShoppingCartContextMock.mockReset(); // 모든 작업을 수행하고 빈 함수로 대체한다.
  });

  it('미 로그인', async () => {});
});
