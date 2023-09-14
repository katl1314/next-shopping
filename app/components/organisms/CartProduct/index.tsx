'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Button, { ButtonVariant } from '@components/atoms/Button';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';
import Flex from '@components/layout/Flex';

type ButtonClickFunc = (id: number) => void;

export interface ICartProductProps {
  /**
   * 상품 고유 아이디
   */
  id: number;
  /**
   * 상품 이미지
   */
  imageUrl: string;
  /**
   * 상품 제목
   */
  title: string;
  /**
   * 상품 가격
   */
  price: number;
  /**
   * 구입 버튼 클릭 시 이벤트 핸들러
   */
  onBuyButtonClick?: ButtonClickFunc;
  /**
   * 카트에서 삭제 클릭시 이벤트 핸들러
   */
  onRemoveButtonClick?: ButtonClickFunc;
}

const RemoveText = styled(Text)<{ color: ButtonVariant }>`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CartProduct = (props: ICartProductProps) => {
  const { id, imageUrl, title, price, onBuyButtonClick, onRemoveButtonClick } = props;
  return (
    <Flex width="100%" justifycontent="space-between" padding="1% 5%">
      <Flex>
        <Box width="120px" height="120px">
          {/* passHref는 href속성을 자식 컴포넌트에도 전달한다. */}
          <Link href={`/products/${id}`} passHref={true}>
            <Image width={120} height={120} src={imageUrl} alt={title} />
          </Link>
        </Box>
        <Box padding={1}>
          <Flex
            height="100%"
            flexdirection="column"
            justifycontent="space-between"
            paddingleft="2%"
          >
            <Box>
              <Text fontWeight="bold" variant="mediumLarge" margintop="5px" marginbottom="10px">
                {title}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" variant="medium">
                {price}원
              </Text>
            </Box>
            <Box>
              <Flex>
                <Button
                  width={{ base: '100px', md: '200px' }}
                  onClick={() => onBuyButtonClick && onBuyButtonClick(id)}
                >
                  구입
                </Button>
                <Button
                  marginleft={1}
                  width={{ base: '100px', md: '200px' }}
                  display={{ base: 'block', md: 'none' }}
                  variant="danger"
                  onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
                >
                  삭제
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex>
        <Box display={{ base: 'none', md: 'block' }}>
          <RemoveText color="danger" onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}>
            카트에서 삭제
          </RemoveText>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartProduct;
