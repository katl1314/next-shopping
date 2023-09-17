'use client';

import { useCallback, useState } from 'react';
import styled from 'styled-components';
import theme from '@/app/theme';
/**
 * React.TextareaHTMLAttributes => textarea에 사용되는 attributes 타입이 정의되어 있음.
 */
export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // 최소 행
  minRows?: number;
  // 최대 행
  maxRows?: number;
  // 변형 에러 플래그
  hasError?: boolean;
  theme?: typeof theme;
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
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : 'black')};

  &::placeholder {
    color: blue;
  }
`;

const TextArea = (props: ITextAreaProps) => {
  const { rows = 5, minRows = 5, maxRows = 10, children, hasError, onChange, ...rest } = props;

  const [textareaRows, setTextAreaRows] = useState(Math.min(rows, minRows)); // rows와 minRows중 가장 작은 수를 textareaRow의 초기값으로...

  // console.assert => 조건식이 false이면 로그를 표시한다.
  // rows은 minRows보다 작을 수 없다.

  // 값 변경 이벤트 => useCallback으로 감싸서, 메모이제이션을 유지한다.
  // 만약 의존 리스트에 지정된 값이 변화가 발생하지 않으면, 메모이제이션된 함수를 사용한다.
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // textarea의 줄 높이 24px
      const textareaLineHeight = 24;
      const previousRows = e.target.rows; // 이전 행

      // 행 수 초기화
      e.target.rows = minRows;

      // 현재 행 수
      // scrollHeight에서 lineHeight를 나눈 반올림값을 textarea의 현재 행 수
      const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      // 현재 행 수가 maxRows보다 클 경우 maxRows로 고정한다.
      if (currentRows > maxRows) {
        e.target.rows = maxRows;
        e.target.scrollTop = e.target.scrollHeight;
      }

      // 최대를 넘지 않도록 행 수 초기화
      // currentRows는 반드시 minRows보다 크거나 같으며, maxRows보다 작아야한다.
      setTextAreaRows(currentRows > maxRows ? maxRows : currentRows);
      onChange && onChange(e);
    },
    [onChange, minRows, maxRows],
  );

  return (
    <StyledTextArea
      hasError={hasError}
      onChange={handleChange}
      aria-label={rest.placeholder}
      rows={textareaRows}
      {...rest}
    >
      {children}
    </StyledTextArea>
  );
};

// 컴포넌트 props 기본값 설정
// React의 최신 버전부터 defaultProps을 사용하지 않습니다.

export default TextArea;
