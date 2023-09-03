import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from '@/app/components/atoms/Button';

// Meta속성 정보를 입력
const meta: Meta<typeof Button> = {
  component: Button, // 스토리북 대상 컴포넌트
  title: '버튼', // 사이드 바의 타이틀,
  tags: ['autodocs'],
  // control // props을 변경하기 위한 ui를 설정 text, select, boolean, array, object, ...
};

// render, component, args속성 가진 객체를 반환함.
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  // 스토리북에 표시한 컴포넌트의 props를 지정한다.
  args: {
    children: 'Primary',
    padding: '10px 10px',
    variant: 'primary',
  },
  // 컴포넌트에 전달한 인자들의 옵션 및 설명 정의
  argTypes: {
    // 버튼 클릭 속성 정의
    onClick: {
      action: 'clicked', // 클릭시 'clicked'라는 action전달
    },
    variant: {
      // defaultValue: 'primary', // storybook7의 경우 더이상 args의 기본값을 유추하지 않는다.
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
      description: '버튼 변형',
    },
    disabled: {
      control: { type: 'boolean' }, // 토글 UI를 통해 값 변경 간으
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
};

export const Secondary: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  args: {
    children: 'Secondary',
    padding: '10px 10px',
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export const Danger: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  args: {
    children: 'Danger',
    padding: '10px 10px',
    variant: 'danger',
  },
  argTypes: {
    // variant props에 대해 지정
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
