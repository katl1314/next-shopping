import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  let renderResult: RenderResult;
  let handleClick: jest.Mock;

  beforeEach(() => {
    // 테스트 이전에 이벤트 핸들러 정의하고, render함수를 통해 컴포넌트를 마운트
    handleClick = jest.fn();
    renderResult = render(
      <Button variant="primary" onClick={handleClick}>
        Button
      </Button>,
    );
  });

  afterEach(() => {
    renderResult.unmount(); // 렌더링된 컴포넌트 언마운트
  });

  it('버튼 클릭 시 onClick 호출', () => {
    fireEvent.click(screen.getByText('Button')); // 특정 text를 가진 요소를 클릭한다.
    // 테스트 시 특정 조건을 충족하는지 확인한다.
    expect(handleClick).toHaveBeenCalledTimes(1); // 버튼이 지정된 횟수만큼 클릭되었늕 확인한다.
  });
});
