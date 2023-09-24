'use client';
import styled from 'styled-components';
import theme from '@/app/theme';
import type {
  CSSPropertyAlignItems,
  CSSPropertyAlignContent,
  CSSPropertyJustifyItems,
  CSSPropertyJustifyContent,
  CSSPropertyFlexWrap,
  CSSPropertyFlexDirection,
  CSSPropertyJustifySelf,
  CSSPropertyAlignSelf,
  Responsive,
} from '@/app/types/style';
import { toPropValue } from '@/app/utils/style'; // prop -> css
import Box, { IBoxProps } from '@components/layout/Box';

// Flex컴포넌트는 Box컴포넌트를 상속받는다.
interface IFlexProps extends IBoxProps {
  alignitems?: Responsive<CSSPropertyAlignItems>;
  aligncontent?: Responsive<CSSPropertyAlignContent>;
  justifycontent?: Responsive<CSSPropertyJustifyContent>;
  justifyitems?: Responsive<CSSPropertyJustifyItems>;
  flexwrap?: Responsive<CSSPropertyFlexWrap>;
  flexbasis?: Responsive<string>;
  flexdirection?: Responsive<CSSPropertyFlexDirection>;
  flexgrow?: Responsive<string>;
  flexshrink?: Responsive<string>;
  justifyself?: Responsive<CSSPropertyJustifySelf>;
  alignself?: Responsive<CSSPropertyAlignSelf>;
  order?: Responsive<string>;
  children?: React.ReactNode[] | React.ReactNode;
}

export const FlexLayout = styled(Box)<IFlexProps>`
  display: flex;
  ${props => toPropValue('align-items', props.alignitems, theme)}
  ${props => toPropValue('align-content', props.aligncontent, theme)}
  ${props => toPropValue('justify-item', props.justifyitems, theme)}
  ${props => toPropValue('justify-content', props.justifycontent, theme)}
  ${props => toPropValue('flex-wrap', props.flexwrap, theme)}
  ${props => toPropValue('flex-basis', props.flexbasis, theme)}
  ${props => toPropValue('flex-direction', props.flexdirection, theme)}
  ${props => toPropValue('flex-grow', props.flexgrow, theme)}
  ${props => toPropValue('flex-shrink', props.flexshrink, theme)}
  ${props => toPropValue('justify-self', props.justifyself, theme)}
  ${props => toPropValue('align-self', props.alignself, theme)}
  ${props => toPropValue('order', props.order, theme)};
`;

const Flex = (props: IFlexProps) => {
  const { display, children, ...rest } = props;
  return (
    <FlexLayout {...rest} display={display}>
      {children}
    </FlexLayout>
  );
};

export default Flex;
