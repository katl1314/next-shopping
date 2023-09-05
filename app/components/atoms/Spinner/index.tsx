'use client';
// import { useState, CSSProperties } from 'react';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

// CSSProperties는 react 컴포넌트에 적용할 css를 객체로 지정함.

export interface ISpinnerProps {
  isLoading: boolean;
  color?: string;
  size?: number;
}
const Spinner = ({ isLoading, size, color }: ISpinnerProps) => {
  const [loading] = useState(isLoading);
  return loading ? (
    <>
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  ) : (
    <></>
  );
};

export default Spinner;
