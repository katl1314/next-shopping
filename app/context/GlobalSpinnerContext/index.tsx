'use client';

import { useState, useContext, createContext, Dispatch, SetStateAction } from 'react';

// createContext<제네릭타입>(initParams) : 콘텍스트 생성
// GlobalSpinnerContext 글로벌 스피너 표시/미표시
const GlobalSpinnerContext = createContext<boolean>(false);
// 상위 컴포넌트에서 useState함수를 넘길때, react에서는 적절한 타입을 제공하고 있음.
// state의 타입은 useState사용할때 제네릭으로 지정한다.
// SetStateAction => 이전 상태를 가져와 새로운 상태로 변경하는 함수
// Dispatch : 매개변수로 사용되는 의미있는 void를 반환

// GlobalSpinnerActionsContext : 글로벌 스피너 표시/미표시 액션
const GlobalSpinnerActionsContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

// 콘텍스트 사용 : useContext
export const useGlobalSpinnerContext = (): boolean => {
  return useContext<boolean>(GlobalSpinnerContext);
};

export const useGlobalSpinnerActionsContext = (): Dispatch<SetStateAction<boolean>> => {
  return useContext<Dispatch<SetStateAction<boolean>>>(GlobalSpinnerActionsContext);
};

/**
 * ReactNode, ReactElement, JSX.Element
 * 클래스형 컴포넌트의 render함수의 반환타입은 ReactNode
 * 함수형 컴포넌트의 반환타입은 ReactElement이다.
 * React.createElement의 반환타입은 ReactElement, JSX.Element이다.
 * ReactNode > ReactElement > JSX.Element순이다
 *
 * ReactNode는 ReactElement의 슈퍼셋으로 리액트 컴포넌트 만 아니라 다른 값도 올 수 있음. null, undefined, ...
 * ReactElement은 리액트 컴포넌트 타입
 */

interface GlobalSpinnerContextProviderProps {
  children: React.ReactNode;
}

// 글로벌 스피너 컨텍스트 제공자
const GlobalSpinnerContextProvider = ({ children }: GlobalSpinnerContextProviderProps) => {
  const [isGlobalSpinnerOn, setIsGlobalSpinnerOn] = useState<boolean>(false);

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider
        value={() => setIsGlobalSpinnerOn(prevState => !prevState)}
      >
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
