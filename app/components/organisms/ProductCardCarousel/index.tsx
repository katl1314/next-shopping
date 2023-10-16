'use client';
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import Box from '@components/layout/Box';

interface ProductCardCarouselProps {
  children?: React.ReactNode;
}

/**
 * 상품 카드 캐러셀
 */
const ProductCardCarousel = ({ children }: ProductCardCarouselProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <Box 
      maxwidth={{ md : '1024px', base: '800px'}} 
      paddingleft={{ md : '60px', base : '0px'}} 
      paddingright={{ md : '60px', base : '0px'}}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >{children}</ItemsCarousel>
    </Box>
  );
};

export default ProductCardCarousel;
