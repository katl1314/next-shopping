import React, { useContext, createContext } from 'react';
import useSWR from 'swr';
import signIn from '@services/auth/signIn';
import signOut from '@services/auth/signOut';
import type { ApiContext, User } from '../../types';

/**
 * 인증 컨텍스트를 위한 타입
 */
interface IAuthContext {
  authUser?: User; // 사용자 정보
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: (id: number) => Promise<boolean>;
  mutate: (data?: User | Promise<User>, shouldRevalidate?: boolean) => Promise<User | undefined>;
}

/**
 * 인증컨텍스트 제공자를 위한 타입
 */
interface IAutoContextProviderProps {
  context: ApiContext;
  authUser?: User;
}

/**
 * 컨텍스트 생성
 */
const AuthContext = createContext<IAuthContext>({
  authUser: undefined,
  isLoading: false,
  signIn: async () => Promise.resolve(false),
  signOut: async () => Promise.resolve(false),
  mutate: async () => Promise.resolve(undefined),
});

// 생성된 컨텍스트 상태값을 가져올 수 있음.
export const useAuthContext = (): IAuthContext => {
  return useContext(AuthContext);
};

// React.PropsWithChildren<T> => <T & { children : React.ReactNode} >
export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<IAutoContextProviderProps>) => {
  // const { data, error, isValidating, mutate } = useSWR(key, fetcher, option)
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/me`,
  );

  const isLoading = !data && !error; // data가 undefined이면서 error도 undefined일때

  // 로그인
  const signinInternal = async (username: string, password: string): Promise<boolean> => {
    await signIn(context, { username, password });
    await mutate();
    return true;
  };

  // 로그아웃
  const signOutInternal = async (id: number): Promise<boolean> => {
    await signOut(context, id);
    await mutate();
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: data ?? authUser,
        isLoading,
        mutate,
        signIn: signinInternal,
        signOut: signOutInternal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
