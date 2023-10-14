import type { Metadata } from 'next';

export default function SigninLayout({ children }: { children: React.ReactElement }) {
  return <div>{children}</div>;
}

export const metadata: Metadata = {
  title: '로그인',
};
