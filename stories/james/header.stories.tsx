import { StoryObj, Meta } from '@storybook/react';
import { useEffect } from 'react';
import type { User, ApiContext } from '@/app/types';
import Header from '@components/organisms/Header';
import { AuthContextProvider } from '@context/AuthContext';
import ShoppingCartProvider, { useShoppingCartContext } from '@context/ShoppingCartContext';
type Story = StoryObj<typeof Header>;

// 미 로그인 상태시 헤더
export const NoLogin: Story = {
  render: () => <Header />,
};

const ChildComponent = () => <Header />;

export const Login: Story = {
  render: () => {
    const authUser: User = {
      id: 1,
      username: 'choi1997',
      displayName: 'MinHyeok Choi',
      email: 'choi1997@naver.com',
      profileImageUrl: '/images/1.jpg',
      description: '반갑습니다',
      numberOfProducts: 0,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { addProductToCart } = useShoppingCartContext();
    const context: ApiContext = {
      apiRootUrl: 'https://dummy',
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      addProductToCart({
        id: 0,
        category: 'book',
        title: 'harry potter',
        description: 'norvel',
        imageUrl: '',
        blurDataUrl: '',
        price: 12000,
        condition: 'new',
        owner: authUser.id,
      });
    }, []);
    return (
      <ShoppingCartProvider>
        <AuthContextProvider authUser={authUser} context={context}>
          <ChildComponent />
        </AuthContextProvider>
      </ShoppingCartProvider>
    );
  },
};

export default {
  title: 'Header 테스트',
  component: Header,
} satisfies Meta<typeof Header>;
