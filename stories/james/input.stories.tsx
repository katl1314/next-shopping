import type { StoryObj, Meta } from '@storybook/react';
import Input from '@components/atoms/Input';

type Story = StoryObj<typeof Input>;

export const Name: Story = {
  render: props => <Input {...props} />,
};

// 컴포넌트 스토리 작성
// argTypes => storybook ui에서 인터렉티브(상호작용)한 컨트롤을 만들어 props을 변화시킬 수 있음.
const meta: Meta<typeof Input> = {
  title: '입력창',
  component: Input,
  args: {
    placeholder: 'aaa',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
