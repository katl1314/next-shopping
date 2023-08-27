'use client';

import styled from 'styled-components';
import theme from '@/app/theme';
import type { Responsive } from '@/app/types';
import { toPropValue, Color, FontSize, LetterSpacings, LineHeight, Space } from '@/app/utils/style';

// 버튼 형태
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

// 커스텀 버튼 속성 React.ButtonHTMLAttributes을 통해 버튼 기본 속성 재정의
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fontSize?: Responsive<FontSize>;
  fontWeight?: Responsive<string>;
  letterSpacing?: Responsive<LetterSpacings>;
  lineHeight?: Responsive<LineHeight>;
  textAlign?: Responsive<string>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minWidth?: Responsive<string>;
  minHeight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  backgroundColor?: string;
  // 바깥 여백
  margin?: Responsive<Space>;
  marginTop?: Responsive<Space>;
  marginRight?: Responsive<Space>;
  marginBottom?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  // 안쪽 여백
  padding?: Responsive<Space>;
  paddingTop?: Responsive<Space>;
  paddingRight?: Responsive<Space>;
  paddingBottom?: Responsive<Space>;
  paddingLeft?: Responsive<Space>;
  // 의사 클래스(가상 클래스)
  pseudoClass?: {
    hover?: { backgroundColor?: Responsive<Color> };
    disabled?: { backgroundColor?: Responsive<Color> };
  };
}

// variants을 통해 primary, secondary, danger 버튼을 각각 정의한다.
const variants = {
  primary: {
    color: 'white',
    backgroundColor: 'primary',
    border: 'none',
    pseudoClass: {
      hover: {
        backgroundColor: 'primaryDark',
      },
      disabled: {
        backgroundColor: 'primary',
      },
    },
  },
  secondary: {
    color: 'white',
    backgroundColor: 'secondary',
    border: 'none',
    pseudoClass: {
      hover: {
        backgroundColor: 'secondaryDark',
      },
      disabled: {
        backgroundColor: 'secondary',
      },
    },
  },
  danger: {
    color: 'white',
    backgroundColor: 'danger',
    border: 'none',
    pseudoClass: {
      hover: { backgroundColor: 'dangerDark' },
      disabled: { backgroundColor: 'danger' },
    },
  },
};

const Button = styled.button<IButtonProps>`
  ${({ variant, color, backgroundColor, pseudoClass }) => {
    // Button이 가진 props을 가지고 처리한다.
    // 변형 스타일 적용
    if (variant && variants[variant]) {
      const styles = [];

      // color가 undefined이면 variant내 color를 대신한다.
      if (!color) {
        styles.push(toPropValue('color', variants[variant].color, theme));
      }

      // backgroundColor가 undefined이면 variant내 backgroundColor가 대신한다.
      if (!backgroundColor) {
        styles.push(toPropValue('background-color', variants[variant].backgroundColor, theme));
      }

      // backgroundColor가 undefined이면 variant내 backgroundColor가 대신한다.
      if (!pseudoClass) {
        styles.push(
          `&:hover { ${toPropValue(
            'background-color',
            variants[variant]?.pseudoClass?.hover?.backgroundColor,
            theme,
          )} }`.replaceAll('\n', ''),
        );
        styles.push(
          `&:disabled {
            ${toPropValue(
              'background-color',
              variants[variant].pseudoClass.disabled.backgroundColor,
            )}
          }`.replaceAll('\n', ''),
        );
      }
      return styles.join('\n');
    }
  }}

  ${props => toPropValue('font-size', props.fontSize, theme)}
  ${props => toPropValue('letter-spacing', props.letterSpacing, theme)}
  ${props => toPropValue('line-height', props.lineHeight, theme)}
  ${props => toPropValue('color', props.color, theme)}
  ${props => toPropValue('background-color', props.backgroundColor, theme)}
  ${props => toPropValue('width', props.width, theme)}
  ${props => toPropValue('height', props.height, theme)}
  ${props => toPropValue('min-width', props.minWidth, theme)}
  ${props => toPropValue('min-height', props.minHeight, theme)}
  ${props => toPropValue('display', props.display, theme)}
  ${props => toPropValue('border', props.border, theme)}
  ${props => toPropValue('overflow', props.overflow, theme)}
  ${props => toPropValue('margin', props.margin, theme)}
  ${props => toPropValue('margin-top', props.marginTop, theme)}
  ${props => toPropValue('margin-left', props.marginLeft, theme)}
  ${props => toPropValue('margin-bottom', props.marginBottom, theme)}
  ${props => toPropValue('margin-right', props.marginRight, theme)}
  ${props => toPropValue('padding', props.padding, theme)}
  ${props => toPropValue('padding-top', props.paddingTop, theme)}
  ${props => toPropValue('padding-left', props.paddingLeft, theme)}
  ${props => toPropValue('padding-bottom', props.paddingBottom, theme)}
  ${props => toPropValue('padding-right', props.paddingRight, theme)}
  &:hover {
    ${props => toPropValue('background-color', props.pseudoClass?.hover?.backgroundColor, theme)}
  }

  &:disable {
    ${props => toPropValue('background-color', props.pseudoClass?.disabled?.backgroundColor, theme)}
  }
  cursor: 'pointer';
  outline: 0;
  text-decoration: 'none';
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  border: 'none';
  border-radius: 4px;
`;

// Button컴포넌트 기본 props설정
Button.defaultProps = {
  variant: 'primary',
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 1,
  paddingBottom: 1,
  color: 'white',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: 'inherit',
  fontSize: 'inherit',
};

export default Button;
