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
  fontweight?: Responsive<string>;
  letterspacing?: Responsive<LetterSpacings>;
  lineheight?: Responsive<LineHeight>;
  textalign?: Responsive<string>;
  width?: Responsive<string>;
  height?: Responsive<string>;
  minwidth?: Responsive<string>;
  minheight?: Responsive<string>;
  display?: Responsive<string>;
  border?: Responsive<string>;
  overflow?: Responsive<string>;
  backgroundcolor?: string;
  // 바깥 여백
  margin?: Responsive<Space>;
  margintop?: Responsive<Space>;
  marginright?: Responsive<Space>;
  marginbottom?: Responsive<Space>;
  marginleft?: Responsive<Space>;
  // 안쪽 여백
  padding?: Responsive<Space>;
  paddingtop?: Responsive<Space>;
  paddingright?: Responsive<Space>;
  paddingbottom?: Responsive<Space>;
  paddingleft?: Responsive<Space>;
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

const StyledButton = styled.button<IButtonProps>`
  ${({ variant, color, backgroundcolor: backgroundColor, pseudoClass }) => {
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
  ${props => toPropValue('letter-spacing', props.letterspacing, theme)}
  ${props => toPropValue('line-height', props.lineheight, theme)}
  ${props => toPropValue('color', props.color, theme)}
  ${props => toPropValue('background-color', props.backgroundcolor, theme)}
  ${props => toPropValue('width', props.width, theme)}
  ${props => toPropValue('height', props.height, theme)}
  ${props => toPropValue('min-width', props.minwidth, theme)}
  ${props => toPropValue('min-height', props.minheight, theme)}
  ${props => toPropValue('display', props.display, theme)}
  ${props => toPropValue('border', props.border, theme)}
  ${props => toPropValue('overflow', props.overflow, theme)}
  ${props => toPropValue('margin', props.margin, theme)}
  ${props => toPropValue('margin-top', props.margintop, theme)}
  ${props => toPropValue('margin-left', props.marginleft, theme)}
  ${props => toPropValue('margin-bottom', props.marginbottom, theme)}
  ${props => toPropValue('margin-right', props.marginright, theme)}
  ${props => toPropValue('padding', props.padding, theme)}
  ${props => toPropValue('padding-top', props.paddingtop, theme)}
  ${props => toPropValue('padding-left', props.paddingleft, theme)}
  ${props => toPropValue('padding-bottom', props.paddingbottom, theme)}
  ${props => toPropValue('padding-right', props.paddingright, theme)}
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

// variant: 'primary',
// paddingleft: 2,
// paddingright: 2,
// paddingtop: 1,
// paddingbottom: 1,
// color: 'white',
// display: 'inline-block',
// textalign: 'center',
// lineheight: 'inherit',
// fontSize: 'inherit',

const Button = (props: IButtonProps) => {
  const {
    variant = 'primary',
    color = 'white',
    display = 'inline-block',
    textalign = 'center',
    lineheight = 'inherit',
    fontSize = 'inherit',
    ...rest
  } = props;

  return (
    <StyledButton
      {...rest}
      variant={variant}
      color={color}
      display={display}
      textalign={textalign}
      lineheight={lineheight}
      fontSize={fontSize}
    />
  );
};

export default Button;
