'use client';

import styled from 'styled-components';
import type { Responsive } from '@/app/types/style';
import { toPropValue, Space, LetterSpacings, LineHeight, Color, FontSize } from '@/app/utils/style';

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
  letterSpacing?: Responsive<LetterSpacings>;
  lineHeight?: Responsive<LineHeight>;
  textAlign?: Responsive<string>;
  color?: Responsive<Color>;
  backgroundColor?: Responsive<Color>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  margin?: Responsive<Space>;
  marginTop?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  marginBottom?: Responsive<Space>;
  marginRight?: Responsive<Space>;
  padding?: Responsive<Space>;
  paddingTop?: Responsive<Space>;
  paddingLeft?: Responsive<Space>;
  paddingBottom?: Responsive<Space>;
  paddingRight?: Responsive<Space>;
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
  ${({ variant, fontSize, letterSpacing, lineHeight, theme }) => {
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
  ${props => toPropValue('letter-spacing', props.letterSpacing, props.theme)}
  ${props => toPropValue('line-height', props.lineHeight, props.theme)}
  ${props => toPropValue('color', props.color, props.theme)}
  ${props => toPropValue('background-color', props.backgroundColor, props.theme)}
  ${props => toPropValue('width', props.width, props.theme)}
  ${props => toPropValue('height', props.height, props.theme)}
  ${props => toPropValue('min-width', props.minWidth, props.theme)}
  ${props => toPropValue('min-height', props.minHeight, props.theme)}
  ${props => toPropValue('display', props.display, props.theme)}
  ${props => toPropValue('border', props.border, props.theme)}
  ${props => toPropValue('overflow', props.overflow, props.theme)}
  ${props => toPropValue('margin', props.margin, props.theme)}
  ${props => toPropValue('margin-top', props.marginTop, props.theme)}
  ${props => toPropValue('margin-left', props.marginLeft, props.theme)}
  ${props => toPropValue('margin-bottom', props.marginBottom, props.theme)}
  ${props => toPropValue('margin-right', props.marginRight, props.theme)}
  ${props => toPropValue('padding', props.padding, props.theme)}
  ${props => toPropValue('padding-top', props.paddingTop, props.theme)}
  ${props => toPropValue('padding-left', props.paddingLeft, props.theme)}
  ${props => toPropValue('padding-bottom', props.paddingBottom, props.theme)}
  ${props => toPropValue('padding-right', props.paddingRight, props.theme)}
`;

// Text의 기본 props지정
// 컴포넌트에 variant, color props을 지정하지 않으면 기본값을 사용한다.
Text.defaultProps = {
  variant: 'medium',
  color: 'text',
};

export default Text;
