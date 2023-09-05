import { useEffect } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Header from '@components/organisms/Header';
import { AuthContextProvider } from '@context/AuthContext';
import type { User, ApiContext } from '@/app/types';
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
    };

    const { addProductToCart } = useShoppingCartContext();
    const context: ApiContext = {
      apiRootUrl: 'https://dummy',
    };

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
        owner: authUser,
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
