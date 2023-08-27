import type { StoryObj } from '@storybook/react';
import ShapeImage from '@components/atoms/ShapeImage';

type Story = StoryObj<typeof ShapeImage>;

export const Circle: Story = {
  render: props => <ShapeImage {...props} />,
  args: {
    shape: 'circle',
  },
};

export const Square: Story = {
  render: props => <ShapeImage {...props} />,
  args: {
    shape: 'square',
  },
};

export default {
  title: 'Shape Image',
  component: ShapeImage,
  args: {
    src: 'images/1.jpg', // main.ts의 staticDir을 기준으로 경로를 설정하자.
    width: 150,
    height: 150,
  },
};
