'use client';

import styled, { css } from 'styled-components';
import theme from '@/app/theme';
interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  hasBorder?: boolean;
}

const Input = styled.input<IInputProps>`
  color: ${({ theme }) => theme.colors.inputText};
  ${({ hasError, hasBorder, theme }) => {
    // 경계선
    if (hasBorder) {
      return css`
        border: 1px solid #${hasError ? theme.colors.danger : theme.colors.border};
        border-radius: 5px;
      `;
    } else {
      // 여러 css를 작성해야하면 css`...스타일 정보`를 사용한다.
      return css`
        border: none;
      `;
    }
  }}
  padding:11px 12px 12px 9px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 19px;

  // pseudo element
  &::placeholder {
    // 힌트
    color: ${() => theme.colors.placeholder};
  }
`;

Input.defaultProps = {
  hasBorder: true,
  theme,
};

export default Input;
