'use client';

import { useCallback, useState } from 'react';
import styled from 'styled-components';
import theme from '@/app/theme';

export interface ITextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  // 최소 행
  minRow?: number;
  // 최대 열
  minCol?: number;
  // 변형 에러 프러그
  hasError?: boolean;
}

const StyledTextArea = styled.textarea<ITextAreaProps>`
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  resize: none;
  overflow: auto;
  height: auto;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.border)};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

const TextArea = (props: ITextAreaProps) => <StyledTextArea {...props} />;

TextArea.defaultProps = {
  theme,
};

export default TextArea;
