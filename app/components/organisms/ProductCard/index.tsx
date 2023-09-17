'use client';
import Image from 'next/image';
import styled from 'styled-components';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';

interface IProductCardProps {
  /**
   * 상품 제목
   */
  title: string;
  /**
   * 상품 가격
   */
  price: number;
  /**
   * 상품 기획 URL
   */
  imageUrl: string;
  /**
   * 상품의 흐릿한 이미지의 데이터 URI
   */
  blurDataUrl?: string;

  variant?: 'listing' | 'small' | 'detail';
}

/**
 * 상품 카드 이미지 컨테이너
 */
const ProductCardImageContainer = styled.div`
  z-index: 99;
`;
/**
 * 상품 카드 컨테이너
 */
const ProductCardContainer = styled.div`
  position: relative;
`;

/**
 * 상품 카드 정보
 */
const ProductCardInfo = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px; // 부모 요소의 position이 relative이며, 현재 요소가 absolute시 부모 요소를 기준으로 위치를 이동할 수 있다.
  left: 0px;
`;

/**
상품 카드
*/
const ProductCard = (props: IProductCardProps) => {
  const { title, price, imageUrl, blurDataUrl, variant } = props;

  type SizeType = Record<'md' | 'base', string>;

  const { imgSize }: { size?: SizeType; imgSize?: number } = (() => {
    switch (variant) {
      case 'detail':
        return { size: { md: '540px', base: '320px' }, imgSize: 540 };
      case 'small':
        return { size: { md: '240px', base: '160px' }, imgSize: 240 };
      case 'listing':
        return { size: { md: '160px', base: '160px' }, imgSize: 160 };
    }
    return {};
  })();

  return (
    <ProductCardContainer>
      {variant !== 'small' && (
        <ProductCardInfo>
          <Box>
            <Text
              fontSize={{ base: 'small', md: 'mediumLarge' }}
              letterSpacing={{ base: 2, md: 3 }} // letter-spacing 글자 사이 간격
              lineheight={{ base: '32px', md: '48px' }}
              backgroundcolor="white"
              margin={0}
            >
              {title}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize={{ base: 'extraSmall', md: 'medium' }}
              display="inline-block"
              backgroundcolor="white"
              lineheight={{ base: '8px', md: '12px' }}
              margin={0}
            >
              {price}원
            </Text>
          </Box>
        </ProductCardInfo>
      )}
      <ProductCardImageContainer>
        {blurDataUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            objectFit="cover"
            blurDataURL={blurDataUrl}
          />
        )}
        {!blurDataUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={imgSize ?? 240}
            height={imgSize ?? 240}
            objectFit="cover"
          />
        )}
      </ProductCardImageContainer>
      {/* 모바일 환경 */}
      {variant === 'small' && (
        <Box margintop={1}>
          <Text variant="medium" margin={0} padding={0}>
            {title}
          </Text>
          <Text variant="medium">{price}원</Text>
        </Box>
      )}
    </ProductCardContainer>
  );
};

/**
 * 데이터 URL 스킴: 인라인으로 데이터 삽입 방법을 제공함. => API를 제공함
 * base64로 인코딩된 데이터를 인라인에 삽입함으로써, HTTP요청 수가 줄어듬. => 데이터 전송 관련 효율 증가
 */

export default ProductCard;
