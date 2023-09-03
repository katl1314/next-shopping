'use client';
import { useState } from 'react';
// import Dropzone from '../components/molecules/Dropzone';
// import ImagePreview from '../components/molecules/ImagePreview/indes';
import CartProduct from '../components/organisms/CartProduct';

const Test = () => {
  // const handleFileChange = (file: File[]) => {
  //   const image = file[0];
  //   const reader = new FileReader();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   reader.onload = (e: any) => {
  //     const blob = new Blob([new Uint8Array(e.target.result)], { type: image.type });
  //     const url = URL.createObjectURL(blob);
  //     setImageSrc(url);
  //   };
  //   reader.readAsArrayBuffer(image);
  // };

  // const handlePreviewRemove = (src: string) => {
  //   console.info(src);
  //   setImageSrc('');
  // };

  const [imageSrc] = useState<string>('/images/1.jpg');

  return (
    <>
      {/* <Dropzone id="dropzone" width={500} height={300} onChange={handleFileChange}></Dropzone> */}
      {/* <ImagePreview
        width={400}
        height={300}
        src={imageSrc}
        onRemove={handlePreviewRemove}
      ></ImagePreview> */}
      <CartProduct id={1} imageUrl={imageSrc} title="image-1" price={2000}></CartProduct>
      <CartProduct id={1} imageUrl={imageSrc} title="image-2" price={2000}></CartProduct>
    </>
  );
};

export default Test;
