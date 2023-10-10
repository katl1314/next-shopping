import { RenderResult, render, fireEvent, screen, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Dropdown from '.';
import theme from '@/app/theme';

describe('Dropdown', () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // beforeEach : 이 파일에서 각 테스트가 실행하기 전 호출한다.
    handleChange = jest.fn(); // 더미 함수
    const dropdownItem = [
      { value: 'usa', label: '미국' },
      { value: 'england', label: '영국' },
    ];
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropdown id="dropdown" variant="medium" items={dropdownItem} onChange={handleChange} />
      </ThemeProvider>,
    );
  });

  afterEach(() => {
    // afterEach : 이 파일에서 각 테스트가 완료된 이후에 실행한다.
    renderResult.unmount(); // RenderResult.unmount => 렌더링된 컴포넌트를 해제한다.
  });

  it('파일이 드롭되면 onDrop 호출된다.', async () => {
    // act함수는 해당 함수를 실행하여 virtual dom에 적용한다. => dom에 반영되었다고 가정하고 react가 브라우저에서 실행할때와 비슷하게 테스트가능함.
    await act(async () => {
      // const element = await screen.findByTestId('dropdown-control');
      const element = await screen.getByTestId('dropdown-control');
      element && fireEvent.mouseDown(element);
    });
    const elements = await screen.getAllByTestId('dropdown-option'); // dropdown-option은 여러개가 존재함...
    elements && fireEvent.mouseDown(elements[0]);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

/**
 * fireEvent -> userEvent를 사용할 것
 * 1. screen을 사용할 것.
 *
 * react testing library에서는 메서드 불러오는 방식이 있다.
 * 1. 메서드를 testing-library/react로부터 불러오기
 * 2. screen객체를 이용하여 메서드 사용하기
 *
 * getByText 사용 지양
 *
 * getByTestId 사용방법
 * 해당 메서드는 DOM내
 */
