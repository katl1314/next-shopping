'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '@/app/theme';
import Text, { TextVariant } from '@components/atoms/Text';
import Flex from '@components/layout/Flex';

// 드롭다운 래퍼
const DropdownWrapper = styled.div`
  position: relative; // 부모 요소가 relative이므로 자식요소가 absolute이면 부모 요소 기준으로 top, left설정
  height: 38px;
`;

type DropdownItemType = { value: string | number | undefined; label?: string };

interface DropdownProps {
  id: string;
  variant: TextVariant;
  hasError?: boolean;
  items?: DropdownItemType[]; // { value: 'usa', label: '미국' }
  placeholder?: string;
  onChange?: (selected?: DropdownItemType | undefined) => void;
  onMouseDown?: (evnet: React.SyntheticEvent) => void;
}

// 드롭다운 형태
const DropdownControl = styled.div<{ hasError?: boolean }>`
  position: absolute; // 부모 요소가 relative이므로 부모 요소를 기준으로 위치를 잡는다.
  overflow: hidden;
  background-color: #fff;
  // 테두리 hasError props에 따라 다르게 표시한다.
  border: ${({ hasError }) => (hasError ? css`1px solid red` : css`1px solid black`)};
  border-radius: 5px; // 테두리 둥굴게 만들 수 있음.
  box-sizing: border-box; // 너비 높이를 border까지 영역을 기준으로 잡는다.
  cursor: default;
  outline: none;
  width: 100%;
  padding: 8px 52px 8px 52px; // 상, 우, 하, 좌 => 시계방향
`;

const DropdownValue = styled.div`
  color: 'black';
`;

// 드롭다운 플레이스홀더
const DropdownPlaceholder = styled.div<Pick<DropdownProps, 'variant'>>`
  color: '#757575';
  font-size: ${({ variant }) => theme.fontSizes[variant] ?? '16px'};
  line-height: 20px; // 줄 높이
  min-height: 20px; // 최소 높이
`;

// 드롭다운 화살표
const DropdownArrow = styled.div<{ isOpen: boolean }>`
  // 테두리 색상
  border-color: ${({ isOpen }) =>
    isOpen ? css`transparent transparent #222` : css`#222 transparent transparent`};
  // 테두리 두깨
  border-width: ${({ isOpen }) => (isOpen ? '0 5px 5px' : '5px 5px 0')};
  border-style: solid;
  content: ' ';
  display: block;
  height: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 0;
`;

// 드롭다운 메뉴
// DropdownWrapper > DropdownMenu
const DropdownMenu = styled.div`
  background-color: #fff;
  border: ${() => theme.colors.border};
  // 박스 그림자
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 10%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  z-index: 1000;
  top: 100%;
`;

// Dropdown 메뉴 구성요소
const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  // DropdownOption에 마우스 오버시 (pseudo class)
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

interface DropdownItemProps {
  item: DropdownItemType;
}

const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props;
  return (
    <>
      <Flex alignitems="center">
        <Text margin={0} variant="small">
          {item?.label ?? item?.value}
        </Text>
      </Flex>
    </>
  );
};

const Dropdown = (props: DropdownProps) => {
  const { onChange, id, items, placeholder } = props;
  const [isOpen, setIsOpen] = useState(false); // 처음에는 닫혀있음.
  const [selectItem, setSelectItem] = useState<DropdownItemType | undefined>(undefined);
  // dom접근을 위한 리액트 훅 useRef<ref설정하기 위한 요소 객체>
  const dropdownRef = useRef<HTMLDivElement>(null);

  // dropdownRef가 변경되지 않은 이상 캐싱된 함수를 재사용한다.
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current) {
        const elements = Array.from(dropdownRef.current.querySelectorAll('*'));
        for (const elem of elements) {
          if (elem == event.target) {
            // 만약 자신을 선택하면 동작하지 않는다.
            return;
          }
        }
      }
    },
    [dropdownRef],
  );

  const handleMouseDown = useCallback(
    (event: React.SyntheticEvent) => {
      setIsOpen(prevIsOpen => !prevIsOpen);
      event.stopPropagation();
    },
    [setIsOpen],
  );

  // 의존 배열이 빈배열이면 최초 한번 호출한다.
  // useEffect 렌더링이 한번 발생한 다음에 호출함. useLayoutEffect => 화면에 레이아웃 배치 후 실행 페인팅 이전에
  useEffect(() => {
    // document에 클릭 이벤트 바인딩
    document.addEventListener('click', handleDocumentClick, false);
    // document에 터치 이벤트 바인딩
    return () => {
      // clean-up함수 이벤트 초기화
      document.removeEventListener('click', handleDocumentClick, false);
    };
  }, []);

  const handleSelectValue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectItem: DropdownItemType,
  ) => {
    event.stopPropagation();
    setSelectItem(selectItem); // 선택한 값 갱신
    setIsOpen(prevIsOpen => !prevIsOpen); // 항목 선택 후 닫기 기능....
    onChange && onChange(selectItem); // 값 갱신
  };

  return (
    <>
      <DropdownWrapper ref={dropdownRef}>
        <DropdownControl hasError={false} onMouseDown={handleMouseDown}>
          {selectItem ? (
            <DropdownValue>
              <DropdownItem item={selectItem} />
            </DropdownValue>
          ) : (
            <DropdownPlaceholder variant="medium">{placeholder}</DropdownPlaceholder>
          )}
          {/* 값 변경 시 onChange에 selectItem전달 */}
          <input
            type="hidden"
            name={id}
            id={id}
            onChange={() => onChange && onChange(selectItem)}
          />
          <DropdownArrow isOpen={isOpen} />
        </DropdownControl>
        {isOpen && (
          <DropdownMenu>
            {items?.map((item, index) => (
              <DropdownOption key={index} onMouseDown={e => handleSelectValue(e, item)}>
                <DropdownItem item={item}></DropdownItem>
              </DropdownOption>
            ))}
          </DropdownMenu>
        )}
      </DropdownWrapper>
    </>
  );
};

Dropdown.defaultProps = {
  variant: 'normal',
};
export default Dropdown;
