import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from '@/app/components/atoms/Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: '버튼',
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button variant="primary">Primary</Button>,
};

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
};

export const Danger: Story = {
  render: () => <Button variant="danger">Danger</Button>,
};

export default meta;
