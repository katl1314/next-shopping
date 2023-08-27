'use client';

import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';

type ShapeType = 'circle' | 'square'; // 이미지 모형 타입

interface IShapeImageProps extends ImageProps {
  shape: ShapeType;
}

const ImageWithShape = styled(Image)<IShapeImageProps>`
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '0%')};
`;

const ShapeImage = (props: IShapeImageProps) => {
  return <ImageWithShape {...props} />;
};

export default ShapeImage;

// Shape Image : 모양에 따라 이미지를 표시한다.
// next/image를 import한다. => Image컴포넌트 및 ImageProps(Image컴포넌트의 props타입)
// ShapeImage를 위한 인터페이스 추가한다. ImageProps을 확장하기 위해 상속을 받는다.
