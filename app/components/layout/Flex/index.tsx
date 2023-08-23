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
  alignItems?: Responsive<CSSPropertyAlignItems>;
  alignContent?: Responsive<CSSPropertyAlignContent>;
  justifyContent?: Responsive<CSSPropertyJustifyContent>;
  justifyItems?: Responsive<CSSPropertyJustifyItems>;
  flexWrap?: Responsive<CSSPropertyFlexWrap>;
  flexBasis?: Responsive<string>;
  flexDirection?: Responsive<CSSPropertyFlexDirection>;
  flexGrow?: Responsive<string>;
  flexShrink?: Responsive<string>;
  justifySelf?: Responsive<CSSPropertyJustifySelf>;
  alignSelf?: Responsive<CSSPropertyAlignSelf>;
  order?: Responsive<string>;
}

const Flex = styled(Box)<IFlexProps>`
  ${props => toPropValue('align-item', props.alignItems, theme)}
  ${props => toPropValue('align-content', props.alignContent, theme)}
  ${props => toPropValue('justify-item', props.justifyItems, theme)}
  ${props => toPropValue('justify-content', props.justifyContent, theme)}
  ${props => toPropValue('flex-wrap', props.flexWrap, theme)}
  ${props => toPropValue('flex-basis', props.flexBasis, theme)}
  ${props => toPropValue('flex-direction', props.flexDirection, theme)}
  ${props => toPropValue('flex-grow', props.flexGrow, theme)}
  ${props => toPropValue('flex-shrink', props.flexShrink, theme)}
  ${props => toPropValue('justify-self', props.justifySelf, theme)}
  ${props => toPropValue('align-self', props.alignSelf, theme)}
  ${props => toPropValue('order', props.order, theme)}
`;
// 리액트 컴포넌트 defaultProps설정 (따로 설정하지 않아도 기본값으로 전달하는 props)
Flex.defaultProps = {
  display: 'flex',
};

export default Flex;
