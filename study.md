# Chapter 5 ~ 6 과제

## 1. 프로젝트 목표

- 행위자 : 대상
  - 구매자, 익명 사용자, 판매자
- 유스케이스 : 대상이 처리하는 것
  - 상품 검색, 상품 구입, 판매자 프로필 표시, 상품등록, 로그인

## 2. SSR VS SSG VS ISR VS CSR

- SSG : 정적 사이트 생성(Static Site Generator)으로 미리 파일을 만들어둔다. (빌드 시점)
- ISR : SSG처럼 미리 만들어두고, 정기적으로 업데이트를 한다.
- CSR : 개별 콘텐츠에 대해서, 클라이언트 사이드에서 api서버를 이용하여 페이지를 만든다.(개별 콘텐츠에 따라 달리 표시해야할때)
  라우팅, 데이터 가져오는 로직은 클라이언트에서 처리해야함.
  필요한 html과 resource를 한번에 가져오기 때문에 초기 로딩 속도가 느림
- SSR : 사용자의 요청 시 API을 통해 서버 사이드에서 렌더링 후 클라이언트에 전달.
  초기 로드하는 시간이 빠르다.
  페이지 이동시 서버를 거쳐 페이지를 생성하기 때문에 Time to first byte가 느리다. (최초의 1byte가 수신되는 시간)
  SSG + CSR은 SSG로 생성한 부분을 캐시하여 전송, 필요한 부분만 CSR로 처리한다.

## 3. 환경 세팅

1. Typescript기반 Next.js13설치

```bash
npx create-next-app@latest --ts [프로젝트명]
```

2. 터미널에 다음의 질문이 나오면 원하는 것을 선택하자.

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes -- cli에서 --ts을 지정하면 미표시
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias? No / Yes
What import alias would you like configured? @/*
```

3. css-in-js 스타일드 컴포넌트를 생략 -> Emotion으로 사용할것

- emotions/css vs emotions/styled
  emotion/styled : styled-components와 유사한 방식 => 스타일링 컴포넌트로 만들기에 디버깅에 유리함.
  styled-component에 비해 다양한 기능을 포함 => 확장성이 좋다.

4. ESLint 설정
   ESLint은 대표적인 Lint도구로서, 지정한 규칙을 기준으로 코드의 이상 여부를 체크해준다.
   코드상 안티 패턴 및 코딩 컨벤션에 위배되는 코드를 검출해준다.

eslint은 다양한 플러그인을 제공한다.
typescript-eslint
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
eslint-plugin-prettier
eslint-plugin-react
eslint-plugin-react-hooks

모두 --save-dev 또는 -D을 옵션을 사용하여 devDependencies로 설치한다.

그리고 eslint을 커스터마이징을 하기 위해서는 .eslintrc.json에서 설정할 수 있다.

package.json의 script부분 추가
"lint": "next lint --dir app" // app디렉터리 내 lint 검사

4.1. Prettier 설정
.prettierc파일에 코드 포맷팅을 위한 옵션을 설정한다.

```json
{
  "trailingComma": "all", // json마지막 아이템 뒤에 콤마를 사용할 것인가?
  "endOfLine": "lf", // crlf or lf
  "semi": true, // 세미콜론 반드시 사용할 것인가?
  "singleQuote": true, // 싱글 따옴표 사용할것인가?
  "printWidth": 100, // 줄 너비는 얼마?
  "tabWidth": 2, // 탭 너미는 얼마
  "arrowParens": "always", // 화살표함수내 단일 파라미터에 괄호를 포함할지?
  "bracketSpacing": true // 중괄호 양 끝에 공백을 표시할지?
}
```

5. Storybook 설정
   스토리북을 도입할 것이다.

터미널에 다음 명령어를 입력한다.

```bash
npx sb@lastest init
```

조금만 기다리면 설치가 완료되는 것을 확인하자.

storybook에는 다양한 플러그인이 있는데, 아래 플러그인도 설치하자.

설치 후 실행은 다음 명령어를 터미널에 입력한다.

```bash
npm run storybook or yarn storybook
```

### 스토리북 에셋 설정

1. 애셋 배치 준비

스토리북에 대한 에셋을 배치하기 위해 .storybook/public을 작성한다.

다음으로 .storybook/main.ts을 편집하고 staticDirs 옵션을 추가한다.

staticDirs속성은 정적 파일을 배치할 디렉터리를 지정한다.

```json
{
  "staticDirs": ["public"] // 정적 파일을 배치할 디렉터리 정의
}
```

그 다음에 스토리북에 사용할 이미지를 정적 파일을 배치하는 디렉터리인 .storybook/public/images에 배치한다.

[샘플 파일 다운로드](https://github.com/wikibook/ts-nextbook-app/tree/main/.storybook/public/images/sample)

2. 스토리북 테마 설정

- 전체 테마를 설정한다.
- 폰트 크기, 스페이스, 행 높이, 색상, 간격(스페이싱)등 애플리케이션 전체에서 통일하는데 도움이 된다.

  2.1 발생한 이슈
  Delete `cr`에러가 발생한 이유
  => prettier의 기본 라인 개행 방식이 윈도우 개행 방식(CRLF)와 다르기 때문에
  "endOfLine": "auto"로 설정한다.
  내 생각 윈도우 환경의 개행 처리 방식(CRLF)와 MAC환경의 개행 처리 방식(lf)가 다르기 때문으로 보임.

  만약에 .prettierc에서 수정했는데 적용이 안될경우 .eslintrc에서 확인해볼것 rules.prettier config 설정할 수 있음.

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  위 주석을 사용할 경우 명시적으로 any타입을 사용해도 타입검사를 무시한다.

3. 스토리북 설정 파일 수정
   .storybook/preview.ts에서 스토리북에 대한 설정 파일을 설정한다.
   테마 적용 및 간단한 리셋 css, Next.js의 next/image를 변경한다.
   next/image는 이미지를 최적화해주는 이미지 컴포넌트 => 스토리북에서는 적용하지 않음.

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../app/theme';
import * as NextImage from 'next/image';
import React from 'react';

const preview: Preview = {
  // storybook7은 @storybook/react에서 지원하는 addDecorator를 지원하지 않는다.
  // decorators에서 직접 설정해도 된다.
  decorators: [
    (story) => (
      <ThemeProvider theme={theme}>
        {/* 전역 스타일 적용 */}
        <GlobalStyle />
        {story()}
      </ThemeProvider>
    ),
  ], // addDecorator 대체
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// 전역 스타일을 적용하는 함수
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: 0.25s;
    color: #000;
  }
`;

// storybook은 이미지 최적화를 위한 이미지 컴포넌트를 사용할 수 없기 때문에 대체한다.
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) =>
    typeof props.src === 'string' ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    ),
});

export default preview;
```

.storybook/main.ts에서 storybook addon을 추가해야함.
webpackFinal설정은 필요한 애드온을 도입하고, tsconfig속성을 상속받을 수 있다.

### React Hook Form 도입

React Hook Form은 폼 밸리데이션(유효성 검사) 라이브러리이다.
성능/유연성/확장성이 우수한다.
React 컴포넌트의 입력 요소에 사용 가능
리렌더링 수를 최소한으로 억제하여 마운트를 작성함. 뛰어난 사용자 경험을 제공함.

1. 설치법
   npm i react-hook-form
   --

2. 사용법
   react-hook-form은 리액트 form컴포넌트 내 유효성 검사를 위해 사용한다.

```tsx
import { useForm, SubmitHandler } from 'react-hook-form';

interface IForm {
  firstName: string;
  lastName: string;
  category: string;
}

export default function Page() {
  // submit 이벤트 처리
  // useForm을 호출하면 register, handleSubmit, formState값을 객체로 받는다.
  // 제네릭을 이용하여 폼 데이터의 인터페이스를 정의한다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    // submit시 처리한다.
    console.info(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 반드시 필수로 입력해야함. */}
      <input {...register('firstName', { required: true })} placeholder="이름" />
      {errors.firstName && <div>이름을 입력하시오.</div>}
      <input {...register('lastName', { required: true })} placeholder="성" />
      {errors.lastName && <div>성을 입력하시오.</div>}
      <select {...register('category', { required: true })}>
        <option value="">선택...</option>
        <option value="a">카테고리 A</option>
        <option value="b">카테고리 B</option>
      </select>
      {errors.category && <div>카테고리를 선택하세요.</div>}
      <input type="submit" value="전달" />
    </form>
  );
}
```

useForm훅 : form validate 체크를 위한 훅으로 제네릭 타입을 지정할 수 있음. (폼 객체의 타입)
register, handleSubmit: form validation통과시 호출하는 함수, formState: { errors, ...} 폼 검사 상태 여부

### SWR도입

swr은 데이터를 가져오는 react hook 라이브러리
react-query와 상당히 비슷하나, react-query는 push 기능도 지원한다. (useQuery(데이터 취득용), useMutate(데이터 전달용))
일단 캐시를 해, 그 다음 백그라운드에서 일정 시간이 지났을때 업데이트를 한다.

swr은 데이터를 효율적으로 가져올 수 있다.
데이터 업데이트를 지속적으로 자동적으로 받을 수 있음.
=> csr구현을 효율적으로 하기 위해 도입함.

- 캐시 기능 (서버로부터 데이터를 가져올 경우 내부에서 저장한다.)
- 백그라운드 업데이트,
- 정기적인 폴링 => 주기적으로 일정 조건을 만족할 때, 송수신 등 자료처리를 하는 방식
- 이미지 포커스시 데이터 업데이트
- 네트워크 회복시 데이터 재업데이트
- 에러 재시도
- 페이지네이션과 스크롤 포지션 회복

설치 방법은 간단하다.
npm i swr

예제 파일

```tsx
import useSWR from 'swr';

interface IUser {
  name: string;
}

const githubUrl = 'https://api.github.com';

const fetcher = (url: string) => fetch(`${githubUrl}${url}`).then((res) => res.json());

// useSWR : key와 fetcher함수 인자 2개를 받는다.
// key는 데이터의 유일한 식별자로 fetcher의 인자로 전달한다.
// fetcher는 비동기 함수로 fetch 또는 axios같은 비동기 함수를 사용한다.
// 결과값은 data, error, isLoading을 반환한다.
// error는 데이터 조회를 실패하였을때
// isLoading 데이터를 조회중일때
// data 데이터 조회시 결과물
const Profile = (id?: string) => {
  const { data, error, isLoading } = useSWR<IUser>(`/users/${id}`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>loading...</div>; // suspense
  return <div>{data?.name}!</div>;
};
```

### 데이터 로딩 ui를 위한 라이브러리

- React Content Loader도입
- 로딩을 위한 플레이스홀더를 간단하게 작성한다.
- svg를 사용하여 커스터마이징이 가능함.

npm install react-content-loader
npm install --save-dev @types/react-content-loader

```tsc
import ContentLoader from 'react-content-loader';

// react-content-loader를 사용하면 svg를 이용하여 placeholder loading ui를 쉽게 만들 수 있다.
// ContentLoader를 감싸면 됨.
const MyLoader = () => (
  <ContentLoader viewBox="0 038070">
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

export default MyLoader;

```

### 환경 변수

github키 라이브러리 키같은 중요한 키들은 소스에 작성하면 안된다.
반드시 .env파일에서 변수를 지정하고, 외부에서는 process.env를 이용하여 접근해야한다.
