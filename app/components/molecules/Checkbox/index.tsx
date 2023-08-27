'use client';
// eslint-disable-next-line import/no-unresolved
import { useState, useRef, useEffect, useCallback, RefObject } from 'react';
import styled from 'styled-components';
import { CheckBoxOutlineBlankIcon, CheckBoxIcon } from '@components/atoms/IconButton';
import Text from '@components/atoms/Text';
import Flex from '@components/layout/Flex';

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // 표시할 라벨 => 옵셔널하게...
  label?: string;
  ref?: RefObject<HTMLInputElement>; // 리액트 컴포넌트에서 dom접근을 위해서 사용함.
}

// 커스텀한 체크박스를 표시하므로 display none
const CheckboxElement = styled.input<ICheckboxProps>`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  margin-left: 0px;
  user-select: none;
`;

const Checkbox = (props: ICheckboxProps) => {
  const { id, onChange, checked, label, ...rest } = props;
  const [isChecked, setChecked] = useState(checked); // 체크 상태 관리 위한 useState
  const ref = useRef<HTMLInputElement>(null); // dom접근을 위한 useRef

  // 체크 박스 클릭 위한 이벤트
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      ref.current?.click(); // useRef을 사용하면 변수나 dom은 current속성에서 참조해야한다.
      setChecked(isChecked => !isChecked); // 이전값을 not연산자로 변경한다.
    },
    [ref, setChecked],
  );

  // React Hook useEffect has a missing dependency: 'fetchMovieData'. Either include it or remove the dependency array. 해결방법
  useEffect(() => {
    setChecked(checked ?? false);
  }, [checked]); // checked가 변경될때 useEffect를 호출한다. => 다만 props이므로 변경되지 않음.
  return (
    <>
      <CheckboxElement
        {...rest}
        ref={ref}
        type="checkbox"
        checked={checked}
        readOnly={!onChange}
        onChange={onChange}
      ></CheckboxElement>
      {/* Flex 1차원 요소 배치 */}
      <Flex alignItems="center">
        {isChecked ? (
          // 선택 되었으면?
          <CheckBoxIcon size={20} onClick={handleClick} />
        ) : (
          // 선택되지 않으면?
          <CheckBoxOutlineBlankIcon size={20} onClick={handleClick} />
        )}
        {(label ?? '').length > 0 && (
          <Label htmlFor={id} onClick={handleClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  );
};

export default Checkbox;
