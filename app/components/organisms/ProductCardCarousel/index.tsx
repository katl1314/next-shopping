'use client';
import ItemsCarousel from 'react-items-carousel';
import { useState, useRef, useMemo, useEffect } from 'react';
import Box from '@components/layout/Box';

interface ProductCardCarouselProps {
  children?: React.ReactNode;
}

/**
 * 상품 카드 캐러셀
 */
const ProductCardCarousel = ({ children }: ProductCardCarouselProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [gutter, setGutter] = useState<number>(globalThis.innerWidth < 500 ? 2 : 5);
  const chevronWidth = 40;

  useEffect(() => {
    // 브라우저 resize이벤트
    window.addEventListener('resize', resize);
    return () => {
      // resize이벤트 삭제
      window.removeEventListener('resize', resize);
    }
  }, []);

  const resize = () => {
    const width = window.innerWidth; // 브라우저 너비

    if (width < 500) {
      setGutter(2);
    }
    else {
      setGutter(5);
    }
  }

  return (
    <Box 
      maxwidth={{ md : '100%', base: '800px'}} 
      paddingleft={{ md : '100px', base : '20px'}} 
      paddingright={{ md : '100px', base : '20px'}}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={gutter}
        gutter={10}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >{children}</ItemsCarousel>
    </Box>
  );
};

export default ProductCardCarousel;
