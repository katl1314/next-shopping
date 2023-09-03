import { StoryObj, Meta } from '@storybook/react';
import Spinner from '@components/atoms/Spinner';

type Story = StoryObj<typeof Spinner>;

const meta = {
  component: Spinner,
  title: 'spinner',
  // paramters는 정적인 메타데이터, feature와 addon을 제어함.
  // Story parameters > Components parameters > Global parameters 순서대로 적용됨.
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isLoading: { control: 'bool' },
  },
} satisfies Meta<typeof Spinner>;

export const MySpinner: Story = {
  render: props => <Spinner {...props} />,
  args: {
    isLoading: true,
  },
  argTypes: {
    isLoading: {
      description: 'aa', // description은 tags: ['autodocs']을 설정하면 Docs에서 확인가능.
    },
  },
};

export default meta;
