'use client';
import { Inter } from 'next/font/google'; // next.js에서 font를 적용시 사용함.
import Image from 'next/image';
import { useCallback } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import styled from 'styled-components';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';

// next.js에서 구글 폰트 적용
const inter = Inter({ subsets: ['latin'] });

const ImagePreviewContainer = styled(Box)`
  position: relative;
  border: 1px solid black;
  box-sizing: border-box;
`;

const CloseBox = styled(Flex)`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(44, 44, 44, 0.3);
  right: 0;
  border-radius: 0 6px 0 6px;
  cursor: pointer;
  top: 0;
`;

const CloseIcon = () => {
  return (
    <>
      <RiCloseFill size="22" />
    </>
  );
};

interface ImagePreviewProps {
  width: number;
  height: number;
  src?: string; // 이미지 경로
  alt?: string; // 대체 메시지
  onRemove?: (src: string) => void; // 이미지 삭제시 콜백 함수
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { width, height, src, alt, onRemove } = props;

  const handleClose = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove && src && onRemove(src);
    },
    [src, onRemove],
  );
  return (
    <ImagePreviewContainer width={`${width}px`} height={`${width}px`} className={inter.className}>
      {typeof src === 'string' && <Image src={src} alt={alt ?? ''} width={width} height={height} />}
      <CloseBox onClick={event => handleClose(event)} alignitems="center" justifycontent="center">
        <CloseIcon />
      </CloseBox>
    </ImagePreviewContainer>
  );
};

export default ImagePreview;
