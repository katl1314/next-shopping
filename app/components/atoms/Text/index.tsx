'use client';

import { Noto_Sans_KR } from 'next/font/google'; // google fonts에서 제공하는 폰트 컴포넌트를 반환
import styled from 'styled-components';
import type { Responsive } from '@/app/types/style';
import { toPropValue, Space, LetterSpacings, LineHeight, Color, FontSize } from '@/app/utils/style';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

// const roboto = Roboto({
//   subsets: ['latin'], // preload시 적용할 폰트 subsets
//   weight: ['100', '400', '700'],
//   variable: '--roboto', // css 변수 스타일을 지정할 경우 사용함.
// });

export type TextVariant =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'mediumLarge'
  | 'large'
  | 'extraLarge';

// input에 들어가는 속성들을 상속받는다.
export interface ITextProps {
  variant?: TextVariant;
  fontSize?: Responsive<FontSize>;
  fontWeight?: Responsive<string>;
  letterspacing?: Responsive<LetterSpacings>;
  lineheight?: Responsive<LineHeight>;
  textalign?: Responsive<string>;
  color?: Responsive<Color>;
  backgroundcolor?: Responsive<Color>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  margin?: Responsive<Space>;
  margintop?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  marginbottom?: Responsive<Space>;
  marginright?: Responsive<Space>;
  padding?: Responsive<Space>;
  paddingtop?: Responsive<Space>;
  paddingleft?: Responsive<Space>;
  paddingbottom?: Responsive<Space>;
  paddingright?: Responsive<Space>;
}

const variants = {
  extraSmall: {
    fontSize: '8px',
    letterSpacing: 0,
    lineHeight: 0,
  },
  small: {
    fontSize: '12px',
    letterSpacing: 1,
    lineHeight: 1,
  },
  medium: { fontSize: '16px', letterSpacing: 2, lineHeight: 2 },
  mediumLarge: { fontSize: '18px', letterSpacing: 3, lineHeight: 3 },
  large: { fontSize: '24px', letterSpacing: 4, lineHeight: 4 },
  extraLarge: { fontSize: '32px', letterSpacing: 5, lineHeight: 5 },
};

const Text = styled.span<ITextProps>`
  ${({ variant, fontSize, letterspacing: letterSpacing, lineheight: lineHeight, theme }) => {
    if (variant && variants[variant]) {
      const styles = [];
      // 폰트 크기
      if (!fontSize) {
        styles.push(toPropValue('font-size', variants[variant].fontSize, theme));
      }

      // 글자 간격
      if (!letterSpacing) {
        styles.push(toPropValue('letter-spacing', variants[variant].letterSpacing, theme));
      }

      // 줄 높이
      if (!lineHeight) {
        styles.push(toPropValue('line-height', variants[variant].lineHeight, theme));
      }

      return styles.join('\n');
    }
  }}
  ${props => toPropValue('font-weight', props.fontWeight, props.theme)}
  ${props => toPropValue('font-size', props.fontSize, props.theme)}
  ${props => toPropValue('letter-spacing', props.letterspacing, props.theme)}
  ${props => toPropValue('line-height', props.lineheight, props.theme)}
  ${props => toPropValue('color', props.color, props.theme)}
  ${props => toPropValue('background-color', props.backgroundcolor, props.theme)}
  ${props => toPropValue('width', props.width, props.theme)}
  ${props => toPropValue('height', props.height, props.theme)}
  ${props => toPropValue('min-width', props.minWidth, props.theme)}
  ${props => toPropValue('min-height', props.minHeight, props.theme)}
  ${props => toPropValue('display', props.display, props.theme)}
  ${props => toPropValue('border', props.border, props.theme)}
  ${props => toPropValue('overflow', props.overflow, props.theme)}
  ${props => toPropValue('margin', props.margin, props.theme)}
  ${props => toPropValue('margin-top', props.margintop, props.theme)}
  ${props => toPropValue('margin-left', props.marginLeft, props.theme)}
  ${props => toPropValue('margin-bottom', props.marginbottom, props.theme)}
  ${props => toPropValue('margin-right', props.marginright, props.theme)}
  ${props => toPropValue('padding', props.padding, props.theme)}
  ${props => toPropValue('padding-top', props.paddingtop, props.theme)}
  ${props => toPropValue('padding-left', props.paddingleft, props.theme)}
  ${props => toPropValue('padding-bottom', props.paddingbottom, props.theme)}
  ${props => toPropValue('padding-right', props.paddingright, props.theme)}
`;

// Text의 기본 props지정
// 컴포넌트에 variant, color props을 지정하지 않으면 기본값을 사용한다.
Text.defaultProps = {
  variant: 'medium',
  color: 'text',
  className: notoSansKr.className,
};

export default Text;
