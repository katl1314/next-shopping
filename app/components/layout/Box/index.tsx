'use client';
import styled from 'styled-components';
import theme from '@/app/theme';
import { Responsive } from '@/app/types';
import { Color, Space, toPropValue } from '@/app/utils/style';

export interface IBoxProps {
  color?: Responsive<Color>; // 폰트색
  backgroundcolor?: Responsive<Color>; // 배경색
  width?: Responsive<string>; // 컨테이너 너비
  height?: Responsive<string>; // 컨테이너 높이
  minwidth?: Responsive<string>; // 컨테이너 최소 너비
  minheight?: Responsive<string>; // 컨테이너 최소 높이
  display?: Responsive<string>; // 컨테이너 레이아웃 설정 flex, grid, ...
  border?: Responsive<string>; // 컨테이너 테두리
  overflow?: Responsive<string>; // 컨테이너내 내용이 영역에 벗어날 경우 표시할 방법
  margin?: Responsive<Space>; // 컨테이너 바깥쪽 여백
  margintop?: Responsive<Space>;
  marginright?: Responsive<Space>;
  marginbottom?: Responsive<Space>;
  marginleft?: Responsive<Space>;
  padding?: Responsive<Space>;
  paddingtop?: Responsive<Space>;
  paddingright?: Responsive<Space>;
  paddingbottom?: Responsive<Space>;
  paddingleft?: Responsive<Space>;
  onClick?: (event: React.MouseEvent) => unknown;
}

/**
 * Box 컴포넌트
 * 레이아웃 조정에 사용한다
 */
const Box = styled.div<IBoxProps>`
  ${props => toPropValue('color', props.color, theme)}
  ${props => toPropValue('background-color', props.backgroundcolor, theme)}
  ${props => toPropValue('width', props.width, theme)}
  ${props => toPropValue('height', props.height, theme)}
  ${props => toPropValue('min-width', props.minwidth, theme)}
  ${props => toPropValue('min-height', props.minheight, theme)}
  ${props => toPropValue('display', props.display, theme)}
  ${props => toPropValue('border', props.border, theme)}
  ${props => toPropValue('overflow', props.overflow, theme)}
  ${props => toPropValue('margin-top', props.margintop, theme)}
  ${props => toPropValue('margin-left', props.marginleft, theme)}
  ${props => toPropValue('margin-bottom', props.marginbottom, theme)}
  ${props => toPropValue('margin-right', props.marginright, theme)}
  ${props => toPropValue('padding', props.padding, theme)}
  ${props => toPropValue('padding-top', props.paddingtop, theme)}
  ${props => toPropValue('padding-left', props.paddingleft, theme)}
  ${props => toPropValue('padding-bottom', props.paddingbottom, theme)}
  ${props => toPropValue('padding-right', props.paddingright, theme)}
`;

export default Box;
