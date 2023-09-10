'use client';
import Header from '@components/organisms/Header';
import ProductCard from './components/organisms/ProductCard';
import { IProductFormData, ProductForm } from './components/organisms/ProductForm';
export default function Home() {
  const handleProductSave = (data: IProductFormData) => {
    console.info(data);
  };
  return (
    <>
      <Header />
      {/* <ProductCard title="빠른 신발" imageUrl="/images/1.jpg" price={20000} /> */}
      <ProductForm onProductSave={handleProductSave}></ProductForm>
    </>
  );
}
