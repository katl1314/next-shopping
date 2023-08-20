'use client';
import styled from 'styled-components';
import theme from '@/app/theme';
import { Responsive } from '@/app/types';
import { Color, Space, toPropValue } from '@/app/utils/style';

export interface IBoxProps {
  color?: Responsive<Color>; // 폰트색
  backgroundColor?: Responsive<Color>; // 배경색
  width?: Responsive<string>; // 컨테이너 너비
  height?: Responsive<string>; // 컨테이너 높이
  minWidth?: Responsive<string>; // 컨테이너 최소 너비
  minHeight?: Responsive<string>; // 컨테이너 최소 높이
  display?: Responsive<string>; // 컨테이너 레이아웃 설정 flex, grid, ...
  border?: Responsive<string>; // 컨테이너 테두리
  overflow?: Responsive<string>; // 컨테이너내 내용이 영역에 벗어날 경우 표시할 방법
  margin?: Responsive<Space>; // 컨테이너 바깥쪽 여백
  marginTop?: Responsive<Space>;
  marginRight?: Responsive<Space>;
  marginBottom?: Responsive<Space>;
  marginLeft?: Responsive<Space>;
  padding?: Responsive<Space>;
  paddingTop?: Responsive<Space>;
  paddingRight?: Responsive<Space>;
  paddingBottom?: Responsive<Space>;
  paddingLeft?: Responsive<Space>;
}

/**
 * Box 컴포넌트
 * 레이아웃 조정에 사용한다
 */
const Box = styled.div<IBoxProps>`
  ${props => toPropValue('color', props.color, theme)}
  ${props => toPropValue('background-color', props.backgroundColor, theme)}
  ${props => toPropValue('width', props.width, theme)}
  ${props => toPropValue('height', props.height, theme)}
  ${props => toPropValue('min-width', props.minWidth, theme)}
  ${props => toPropValue('min-height', props.minHeight, theme)}
  ${props => toPropValue('display', props.display, theme)}
  ${props => toPropValue('border', props.border, theme)}
  ${props => toPropValue('overflow', props.overflow, theme)}
  ${props => toPropValue('margin-top', props.marginTop, theme)}
  ${props => toPropValue('margin-left', props.marginLeft, theme)}
  ${props => toPropValue('margin-bottom', props.marginBottom, theme)}
  ${props => toPropValue('margin-right', props.marginRight, theme)}
  ${props => toPropValue('padding', props.padding, theme)}
  ${props => toPropValue('padding-top', props.paddingTop, theme)}
  ${props => toPropValue('padding-left', props.paddingLeft, theme)}
  ${props => toPropValue('padding-bottom', props.paddingBottom, theme)}
  ${props => toPropValue('padding-right', props.paddingRight, theme)}
`;

export default Box;
