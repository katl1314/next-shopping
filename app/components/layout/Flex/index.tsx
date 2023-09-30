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
  justifycontent?: Responsive<CSSPropertyJustifyContent>; // flex-direction기준으로 정렬
  justifyitems?: Responsive<CSSPropertyJustifyItems>; // flex-direction의 반대로 기준 정렬
  flexwrap?: Responsive<CSSPropertyFlexWrap>;
  flexbasis?: Responsive<string>;
  flexdirection?: Responsive<CSSPropertyFlexDirection>; // 아이템 배치 방향 (column, row)
  flexgrow?: Responsive<string>; // flex 컨테이너의 남은 영역을 얼마나 차지할지... (비율로...)
  flexshrink?: Responsive<string>; // flex 컨테이너에 아이템이 벗어날 경우 벗어난 아이템 너비만큼 분배해서 줄인다.
  justifyself?: Responsive<CSSPropertyJustifySelf>;
  alignself?: Responsive<CSSPropertyAlignSelf>;
  order?: Responsive<string>; // 순서 배치 dom에 영향 X
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
