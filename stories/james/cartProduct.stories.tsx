import { StoryObj, Meta } from '@storybook/react';
import CartProduct, { ICartProductProps } from '@/app/components/organisms/CartProduct';
import type { Product } from '@/app/types';

type Story = StoryObj<typeof CartProduct>;
const product: Product = {
  id: 1,
  imageUrl: 'images/1.jpg',
  title: '멋진 신발',
  price: 32000,
  category: 'shoes',
  condition: 'new',
  description: '멋진 멋진 신발',
  blurDataUrl: 'images/1.jpg',
  owner: 1,
};

export const NiceShoes: Story = {
  render: (props: ICartProductProps) => <CartProduct {...props}></CartProduct>,
  // args : 컴포넌트에 전달할 props
  args: {
    product,
  },
};

const meta: Meta<typeof CartProduct> = {
  title: 'cart product',
  component: CartProduct,
  tags: ['autodocs'],
};

export default meta;

// storybook v7으로 업데이트되면서 props을 변경하는 것이 대체되었다.
// 기존에는 addon-knobs을 사용하여 변경할 수 있었으나, v7이후에는 controls이 추가되었다.
// controls은 Story의 argTypes에서 정의한다.
