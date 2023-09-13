'use client';

// import ProductCard from './components/organisms/ProductCard';
import UserProfile from './components/organisms/UserProfile';
import ProductForm, { IProductFormData } from '@components/organisms/ProductForm';
import SigninForm from '@components/organisms/SigninForm';

export default function Home() {
  const handleProductSave = (data: IProductFormData) => {
    console.info(data);
  };

  const handleSignIn = (username: string, password: string) => {
    console.log(username, password);
  };
  return (
    <>
      {/* <ProductCard title="빠른 신발" imageUrl="/images/1.jpg" price={20000} /> */}
      <ProductForm onProductSave={handleProductSave}></ProductForm>
      <SigninForm onSignin={handleSignIn} />
      <UserProfile
        username="테스트 사용자"
        profileImageUrl="/images/1.jpg"
        numberOfProducts={2000}
      />
    </>
  );
}
