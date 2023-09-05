import { StoryObj, Meta } from '@storybook/react';
import Checkbox, { ICheckboxProps } from '@/app/components/molecules/Checkbox';

type Story = StoryObj<typeof Checkbox>;

export const Agree: Story = {
  render: props => <Checkbox {...props} />,
  args: {
    checkLabel: '동의',
    unCheckLabel: '미동의',
    checked: true,
  },
  argTypes: {
    onChange: { action: '선택' },
  },
};

const meta: Meta<ICheckboxProps> = {
  title: '체크박스',
  component: props => <Checkbox {...props} />,
  tags: ['autodocs'],
};

export default meta;
