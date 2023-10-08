import ProductForm, { IProductFormData } from '@/app/components/organisms/ProductForm';
import { useGlobalSpinnerActionsContext } from '@/app/context/GlobalSpinnerContext';
import addProduct from '@/app/services/products/add-product';
import { ApiContext, Product } from '@/app/types';

interface ProductFormContainerProps {
  onSave: (err?: Error) => void;
}

const apiContext: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH ?? '/api/proxy',
};

const ProductFormContainer = ({ onSave }: ProductFormContainerProps) => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const handleSave = async (data: IProductFormData) => {
    const product: Omit<Product, 'id'> = {
      category: data.category,
      title: data.title,
      description: data.description,
      imageUrl: '/images/6.jpg',
      blurDataUrl: '',
      price: data.price,
      condition: data.condition,
      owner: 1, // User.id
    };

    try {
      setGlobalSpinner(true); // 스피너 표시
      await addProduct(apiContext, { product });
      onSave?.(undefined);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
        onSave?.(err);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };

  return <ProductForm onProductSave={handleSave} />;
};

export default ProductFormContainer;
