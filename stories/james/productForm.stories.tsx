import { StoryObj, Meta } from '@storybook/react';
import ProductForm, { IProductFormData } from '@/app/components/organisms/ProductForm';

type Story = StoryObj<typeof ProductForm>;

const handleProductSave = (data: IProductFormData) => {
  console.info(data); // { category, condition, description, price, title }
};

export const Sample: Story = {
  argTypes: {
    onProductSave: {
      description: '등록 버튼 클릭시 호출하는 이벤트 핸들러',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  render() {
    return <ProductForm onProductSave={handleProductSave} />;
  },
};

export default {
  title: 'Organism/ProductForm',
} satisfies Meta<typeof ProductForm>;
