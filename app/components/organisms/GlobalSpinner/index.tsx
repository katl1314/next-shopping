'use client';

import styled from 'styled-components';
import Spinner from '@components/atoms/Spinner';
import { useGlobalSpinnerContext } from '@context/GlobalSpinnerContext';

// 표시 미표시에 관련된 컨텍스트
const GlobalSpinnerWrap = styled.div`
  position: 'fixed';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex; // 일차원적으로 요소 배치
  flex-direction: row;
  justify-content: center; // 가로 정렬
  align-items: center; // 세로 정렬
  z-index: 1000; // z축으로 얼마만큼 설정할지...
`;

const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext();
  console.debug(isGlobalSpinnerOn);
  return (
    <GlobalSpinnerWrap>
      <Spinner isLoading={true} />
    </GlobalSpinnerWrap>
  );
};

export default GlobalSpinner;
