'use client';

import styled from 'styled-components';
import theme from '@/app/theme';
import type {
  Responsive,
  CSSPropertyGridColumn,
  CSSPropertyGridRow,
  CSSPropertyGridAutoFlow,
  CSSPropertyGridArea,
} from '@/app/types';
import { toPropValue } from '@/app/utils/style';
import Box, { IBoxProps } from '@components/layout/Box';

interface IGridProps extends IBoxProps {
  gridGap?: Responsive<string>; // 그리드 행과 열 간격
  gridColumnGap?: Responsive<string>; // 열 간격
  gridRowGap?: Responsive<string>; // 행 간격
  gridColumn?: Responsive<CSSPropertyGridColumn>; // grid-column-xxx속성 축약표현 (start, end) 아이템 배치 관련...
  gridRow?: Responsive<CSSPropertyGridRow>;
  gridAutoFlow?: Responsive<CSSPropertyGridAutoFlow>;
  gridAutoColumn?: Responsive<string>;
  gridAutoRow?: Responsive<string>;
  gridTemplateRows?: Responsive<string>;
  gridTemplateColumns?: Responsive<string>; // 컬럼
  gridTemplateAreas?: Responsive<CSSPropertyGridArea>;
  gridArea?: Responsive<string>;
}

const Grid = styled(Box)<IGridProps>`
  ${props => toPropValue('grid-gap', props.gridGap, theme)}
  ${props => toPropValue('grid-column-gap', props.gridColumnGap, theme)}
  ${props => toPropValue('grid-row-gap', props.gridRowGap, theme)}
  ${props => toPropValue('grid-column', props.gridColumn, theme)}
  ${props => toPropValue('grid-row', props.gridRow, theme)}
  ${props => toPropValue('grid-auto-flow', props.gridAutoFlow, theme)}
  ${props => toPropValue('grid-auto-column', props.gridAutoColumn, theme)}
  ${props => toPropValue('grid-auto-row', props.gridAutoRow, theme)}
  ${props => toPropValue('grid-template-rows', props.gridTemplateRows, theme)}
  ${props => toPropValue('grid-template-columns', props.gridTemplateColumns, theme)}
  ${props => toPropValue('grid-template-areas', props.gridTemplateAreas, theme)}
  ${props => toPropValue('grid-area', props.gridArea, theme)}
`;

export default Grid;

// 해당 리액트 컴포넌트의 기본값 프로퍼티 지정
Grid.defaultProps = {
  display: 'grid', // 그리드 컨테이너 정의
};
