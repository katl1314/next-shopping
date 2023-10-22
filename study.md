# 개요

## 프로젝트 준비 앞서 
github repository 생성

터미널에 다음 입력
git init // git 초기화 
git config --global user.name 'new name' // 계정 등록
git config --global user.email 'new email'

git clone <레포지토리 url>

git remote add origin <레포지토리 url>

git switch -c main // master -> main branch
git add . // 모든 수정 사항 스태이지로 올린다.
git commit -m "커밋 메시지" // 스태이지에 올라가있는 파일을 원격 저장소에 올린다.

// 처음 push할 때는 -u을 추가한다.
git push -u origin main




## Next.js v13

Next.js v13 이전과 다르게 v13에는 많은 부분이 추가되거나 변경되었음.
Next.js v13의 모든 컴포넌트들은 서버 사이드 렌더링이며,
클라이언트 렌더링을 원할 경우 코드 상단에 'use client'를 반드시 추가해야한다.

기존의 경우 src/page 폴더에서 페이지에 관련된 코드를 작성하여야 했으나,
next.js13의 경우 app디렉터리 내에서 라우팅이 가능함(파일 시스템 라우팅)

---
page.tsx : 페이징 처리를 위한 컴포넌트 실제로 해당 파일을 기준으로 라우팅이 이루어짐
not-found.tsx : 404(파일이 없을 경우) 표시할 컴포넌트
layout.tsx : 레이아웃 관련 컴포넌트

등등 다양한 파일에서 각각에 대한 기능을 처리해야한다.
---

만약 next.js13에서 리액트 기능 (훅)을 사용할 경우 반드시 클라이언트 사이드 렌더링으로 처리해야함.
```
'use client'; // 클라이언트 렌더링
```

layout.tsx의 경우 해당 파일을 기준으로 하위에도 동일하게 적용되므로, 각각 다른 레이아웃을 구성할때는 layout.tsx을 추가한다.

# Chapter 5 프로젝트 환경 세팅

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

eslint와 prettier를 같이 사용하면 발생할 수 있는 문제점이 있다.
만약 prettier에 적용한 포맷을 사용하면 저장시 설정된 포맷대로 저장되는데
eslint은 구문검사를 담당하기 때문에 여기에 설정된 대로 저장되지 않으면 에러를 띄운다.
그래서 prettier에 설정한 속성을 .eslintrc의 rules에 추가해야한다.

```json
"rules": {
  "prettier/prettier": [
    "error",
    {
      "trailingComma": "all",
      "endOfLine": "auto",
      "semi": true,
      "singleQuote": true,
      "printWidth": 100,
      "tabWidth": 2,
      "arrowParens": "avoid"
    }
  ]
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

아래 이미지를 .storybook에 public에 넣어놨다면
추후 스토리 세팅 시 이미지가 필요할 때 staticDirs에 지정한 경로를 기준으로 찾을 수 있다.

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
    story => (
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
  value: props =>
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
  const onSubmit: SubmitHandler<IForm> = data => {
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

바닐라 익스트렉트 +

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

const fetcher = (url: string) => fetch(`${githubUrl}${url}`).then(res => res.json());

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

### 테스트 환경 구축

npm i --save-dev @testing-library/jest-dom @testing-library/react jest jest-environment-jsdom

위 명령어를 터미널에 입력하여 테스트에 필요한 라이브러리를 설치한다.

jest.setup.js, jest.config.js파일을 생성한다.

```javascript
// jest.config.js
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  // testPathIgnorePatterns : 테스트 제외할 디렉터리 패턴
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/app'], // 모듈
  testEnvironment: 'jsdom', // 테스트 환경
};

module.exports = createJestConfig(customJestConfig);
```

위에 jest.setup.js, jest.config.js을 모두 설치했음에도 실행되지 않으면
test/test.t(j)s파일이 있는지 확인해보자.

# Chapter 6 프로젝트 구현

- 애플리케이션 아키텍처는 개발 생산성과 일관성에 매우 중요 요소다.
- react/next.js 애플리케이션 개발에는 컴포넌트 지향 방식에 따라 애플리케이션 아키텍처를 구축한다.

1. API 클라이언트 구현 (JSON서버용)
2. 반응형 디자인에 대응하여 컴포넌트를 쉽게 구현하도록 유틸리티함수, 래퍼 컴포넌트를 작성한다.
3. 아토믹 디자인을 따라 컴포넌트를 구성한다.
4. 분할 후 스토리북을 이용하여 디자인을 확인하여 구현
5. 분할된 컴포넌트를 조합하면서 페이지를 구축
6. 컴포넌트 단위 테스트를 수행한 뒤 완성한다.

## 6-1. api 클라이언트 구현

- api에 대한 질의를 처리하는 API클라이언트 구현
- Next.js는 api에 대해 요청을 보내는 api클라이언트를 구현하는 경우가 많다.
- json서버는 보통 백엔드로 사용한다.

  1. src/utils폴더를 만든 다음 fetch를 감싸 쉽게 사용하도록 fetcher함수를 생성
  2. api클라이언트를 src/services/auth아래 함수별 파일로 나눠서 구현

- fetch함수를 호출하기 위해서 유틸함수를 만들어야함.
  - app/utils/index.ts파일을 생성
  - 범용적으로 처리할 수 있도록 제네릭 타입을 지정함. (any타입을 되도록 사용을 지양)

```typescript
export const fetcher = async <T,>(resource: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(resource, init);

  // 응답 상태 체크
  if (!res.ok) {
    // 응답 실패시?
    const errorRes = await res.json();
    throw new Error(errorRes.message ?? '서버로부터 요청이 실패하였습니다.');
  }

  // 요청 성공시
  return res.json();
};

/**
 * interface Request extends Body {
    readonly cache: RequestCache;
    readonly credentials: RequestCredentials;
    readonly destination: RequestDestination;
    readonly headers: Headers;
    readonly integrity: string;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: RequestMode;
    readonly redirect: RequestRedirect;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    readonly signal: AbortSignal;
    readonly url: string;
}

init
{
  revalidate?: number | false // 재확인 => 일정 ms지나고 api서버에 재확인(업데이트)
  tags?: string[]
}
 */
```

각 api서버에 대한 요청을 처리하는 로직은 app/services에서 처리한다.

소스는 생략

## 6.2 개발 환경을 위한 API 요청 프록시

교차 출처 리소스 공유(CORS)에서 쿠키 전송을 피하기 위해서, Next.js에서 rewrite기능을 사용한다.
그래서 프록시를 설정해야함.
Next.js에서 엔드포인트에 요청을 전송시, json-server라는 엔드포인트로 변환되어 요청을 전송한다.

next.config.js에서 확인 해보자.

## 6.3 컴포넌트 구현 준비

컴포넌트의 설계 구현에 앞서 준비를 완료한다.

- 반응형 디자인 대응을 간결하게
- 테마 기능 쉽게
- 타입 기능 활용

### 반응형 디자인

- 디바이스의 크기에 따라 UI를 배치하는 디자인.
- 반응형 디자인 (데스크톱 모바일에서 같은 CSS을 준비하고, CSS로 표시를 전환)
- 다른 도메인 (모바일용과 데스크톱용의 URL을 별도로 준비한다. => NAVER같은...) 리다이렉트

미디어 쿼리

- CSS에 @media를 사용하여 특정 디바이스의 너비에 따라 스타일을 적용한다.
  - 640px 이하 : 스마트폰용
  - 641 ~ 1007px : 태블릿용
  - 1008px ~ : 데스크톱용

크기별로 이름을 붙여 관리할 수 있다.
sm : small (640 ~ 767px)
md: middle (768px ~ 1023px)
lg: large (1024px ~ 1279px)
xl : extra large (1280px ~ 1525px)

#### styled-components로 반응형 디자인 구현

화면 크기에 따라 css속성값을 쉽게, 타입을 활용하여 설정할 수 있다.

```tsc
// base(기본)과 sm(small)에 각각 다른 크기 설정
<Component fontSize={{ base : '12rem', sm : '10rem'}}></Component>

물론 base없이도 적절하게 처리할 수 있다.
<Component fontSize="12rem"></Component>

<Component textAlign="100px"></Component>
```

### 래퍼 컴포넌트 구현

- 레이아웃을 조정하는 역할
- 유틸리티 함수를 조합하여 활용
- 웹 프론트엔드의 규모가 커짐에 따라 레이아웃 조정의 필요성이 증가
- 레이아웃과 관련된 컴포넌트는 app/components/layout에 작성한다.

## 6.4 Next.js에서 절대경로 적용하는 방법

지금까지 모듈을 import하였을때, 상대경로를 적용하였다.
상대경로의 단점은 길이가 길어지는 문제가 있기에 가독성이 떨어진다고 생각이 들었다.
tsconfig.json의 paths속성을 사용하여 별칭으로 지어주면 절대 경로를 사용할 수 있다고 한다.

아래 예제는 paths속성을 사용하여 경로에 별칭을 적용한 것이다.

```json
// tsconfig.json
compilerOptions: {
  "paths": {
      "@/*": ["./*"],
      "@components/*": ["./app/components/*"] // app/components하위는 @components로 접근 가능
    }
}
```

### storybook에서 tsconfig에 적용한 paths을 사용하는 방법

그 다음 .storybook/main.ts에서 추가로 설정해줘야함.
웹팩 설정을 커스터마이징을 해주어야함.
// https://dev.to/lico/storybook-plugins-push-of-undefined-error-in-webpackfinal-after-upgrading-from-webpack4-to-webpack5-4280

```ts
webpackFinal: async (config) => {
  if (config && config.resolve) {
    config.resolve.plugins = config.resolve?.plugins ?? [];

    config.resolve.plugins.push(new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, "../tsconfig.json"),
    }));
  }
  return config;
},
```

다만 이렇게 적용했을때 eslint에서 에러가 발생하는 경우가 있다.

> Unable to resolve path to module 모듈경로

다음은 아래 모듈을 추가로 설치하자.

npm i --save-dev eslint-import-resolver-typescript

그다음 .eslintrc.json에 아래와 같이 추가한다.

```json
"settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {}
    }
  },
```

위 모듈을 설치하면 에러가 발생하지 않는다.

Button컴포넌트의 storybook을 위한 styles.tsx파일 작성

```tsx
import type { Meta, StoryObj } from '@storybook/react'; // d.ts내 타입 불러오기 Meta, StoryObj
import React from 'react';
import Button from '@/app/components/atoms/Button';

// Meta속성 정보를 입력
const meta: Meta<typeof Button> = {
  component: Button, // 스토리북 대상 컴포넌트
  title: '버튼', // 사이드 바의 타이틀,
};

// render, component, args속성 가진 객체를 반환함.
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  // 스토리북에 표시한 컴포넌트의 props를 지정한다.
  args: {
    children: 'Primary',
    padding: '10px 10px',
    variant: 'primary',
  },
  // 컴포넌트에 전달한 인자들의 옵션 및 설명 정의
  argTypes: {
    // 버튼 클릭 속성 정의
    onClick: {
      action: 'clicked', // 클릭시 'clicked'라는 action전달
    },
    variant: {
      // defaultValue: 'primary', // storybook7의 경우 더이상 args의 기본값을 유추하지 않는다.
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
      description: '버튼 변형',
    },
    disabled: {
      control: { type: 'boolean' }, // 토글 UI를 통해 값 변경 간으
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
};

export const Secondary: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  args: {
    children: 'Secondary',
    padding: '10px 10px',
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export const Danger: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  args: {
    children: 'Danger',
    padding: '10px 10px',
    variant: 'danger',
  },
  argTypes: {
    // variant props에 대해 지정
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
```

## 6.5 몰리큘 구현

기존에 생성한 텍스트 박스, 텍스트 등 여러 아톰을 모아 몰리큘을 만들 수 있다.
예를 들어 체크박스를 예로 두면, 체크 할 수 있는 체크박스와 라벨값을 표시하는 라벨을 합쳐셔 몰리큘을 구현할 수 있다.

React Hook useEffect has a missing dependency: 'fetchMovieData'. Either include it or remove the dependency array. 해결방법
=> 리액트 훅을 사용하면서, 의존 배열에 대해서 확인을 해보았음.
의존 배열의 경우 상태값, props을 등등 지정할 수 있으며, 해당 값들이 변경되었을때, 훅 내 콜백함수를 실행한다.
만약 의존 배열에 지정한 값이 훅의 콜백에서 사용되지 않으면 경고문이 표시함.

## 6.6 오거니즘 구현

오거니즘은 로그인 폼이나, 헤더보다 구체적인 UI컴포넌트
도메인 지식에 의존하는 데이터를 받거나, 콘텍스트를 참조하거나, 고유의 작동을 가질 수 있다.
|컴포넌트|함수 컴포넌트|
|---|---|
|카트상품|CartProduct|
|푸터|Footer|
|글로벌 스피너|GloalSpinner|
|헤더|Header|
|상품 카드|ProductCard|
|상품 등록 폼|ProductForm|
|로그인 폼|SigninForm|
|사용자 프로필|UserProfile|

### Next13의 next/image에서 objectFit이 사라진 이유

[참고 사이트](https://velog.io/@pixartive/%EC%99%9C-%EC%83%88%EB%A1%9C%EC%9B%8C%EC%A7%84-nextImage%EB%8A%94-%EB%8D%94%EC%9D%B4%EC%83%81-objectFit%EC%9D%84-%ED%95%84%EC%9A%94%EB%A1%9C-%ED%95%98%EC%A7%80-%EC%95%8A%EA%B2%8C-%EB%90%90%EC%9D%84%EA%B9%8C)
72
next.js13에서 Image컴포넌트의 objectFit 미지원
legacy버전에서는 이미지의 크기를 알수 없기에, props로 layout="fill"을 추가했어야함 => 부모요소의 position을 가지고 크기를 결정함.
layout="fill"은 이미지의 크기를 유동적으로 결정하더라고 비율을 보장하지 않았음
그래서 이를 해결하기 위해 objectFit가 등장
defaultProp으로 objectFit을 설정해야했음

다행이도 next13에서는 fill이라는 prop가 추가됨
이미지가 부모 요소를 채우도록 하는 prop이다
반드시 부모 요소는 absolute, relative, fixed같은 position이 설정되어야함.

quality속성은 1 ~ 100중에서 최적화된 이미지를 표시할때 사용함

### next/font/google 적용하기

- next.js은 google fonts을 자체 호스팅
- 구글에 요청을 하지 않음
- 레이아웃 쉬프트 없이 폰트 사용 가능

사용 방법은 매우 쉽다 먼저 원하는 폰트를 import한다. (export)

```typescript
import { Inter } from 'next/font/google';
```

그 다음 변수를 선언하고 함수의 인자로 스타일을 지정한다.

```tsx
const inter = Inter({
  subsets: ['latin'], //  latin, greek, vietnamese
  weight: 700,
});
```

그리고 적용할 컴포넌트의 className에 추가한다.

```tsx
export default App() {
 return <div className={inter.className}>
 </div>
}
```

물론 className에다만 적용하는 것이 아니라, tailwind.config 또는 css 변수로 사용할 수 있다.

추가로 찾아본 점 next.js의 구글 폰트는 preload한다.
subsets은 preload시 하위 집합을 설정한다. => 글꼴 파일을 줄이고 성능 향상 => 반드시 사용해야함.

### next/link 적용하기

HTML의 a태그의 역할과 동등하다고 생각하며 페이지를 이동하기 위한 태그...
legacy version과 차이점은 실제 dom 렌더링시 다른 결과를 갖는다.

### react 컨텍스트 사용하기

props의 drilling을 지양하기 위해, 컨텍스트를 사용하여 props을 원하는 컴포넌트에서 사용한다.
createContext => 컨텍스트 생성
useContext => 컨텍스트 사용

Context.Provider를 props을 받은 컴포넌트에 감싼다.

[스토리북 사용법](https://velog.io/@juno7803/Storybook-Storybook-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0#parameters)

### React does not recognize the `alignItems1` prop on a DOM element. 에러 해결 방법

- props을 직접 Dom Element에 직접 전달해서 발생하는 문제.
  styled-components을 사용하여 작업 시 자주 발생하는 문제로 보임.

커스텀 속성 으로써 DOM에 나타내고 싶다면 lower case로 attributes name을 바꿔 사용하거나,
의도치 않게 위에서 내려온 prop이면 제거하라

=> 접두사로 $을 추가하는 방법이 있다.
<ImageWithText 
  $imageData={data.headerBackgroundImage.childImageSharp.fluid} // notice the '$'
minHeight='50vh'>

### next/link사용 방법

next12와 next13의 next/link사용 방법은 약간 다르다.
next12의 경우 next/link를 통해 Link컴포넌트를 불러올 수 있는데(next13도 마찬가지)
next12의 경우 Link컴포넌트의 자식으로 a태그가 반드시 사용되어야하나,
next13의 경우 a태그를 자식 컴포넌트로 사용하지 않아도 된다.

next12

```tsx
<Link href="/" passHref>
  <a>테스트</a>
</Link>
```

next13에서는 a태그를 자식컴포넌트로 사용할 필요가 없다.

### react-hook-form 적용기

form형식의 페이지에 상태를 관리하는 것을 매우 귀찮은 작업
예를 들어 여러 form이 있고 해당 개수에 맞춰 state를 만들어주고, reset이 필요한 경우 모든 state를 초기화 해줘야한다.
또한 상태값이 변경될때 리렌더링이 발생하므로 이 부분도 문제이다.

react-hook-form은 useForm훅을 제공한다.
쉽게 form을 관리해준다.

값 변경, submit, 조회, 오류 검출 등 여러 작업을 useForm이 한번에 처리가 가능하다

제품 등록, 로그인 등등 react-hook-form을 이용하여 유효성 검사를 실시한다.

설치 : npm i -D react-hook-form

사용하기 1.불러오기 import { useForm } from 'react-hook-form';

useForm을 통해 기본값과, 유효성 검사 관련 옵션등을 설정한다.
그러면 객체를 반환하고 객체 내부에는 register, handleSubmit, reset, errors, ... 다양한 기능들이 포함됨.

유효성 검사 옵션으로 mode가 자주 사용되며 유효성 검사를 언제 실시할지 설정한다.
all, onSubmit, onBlur, onChange등등이 있으나, onChange의 경우 값이 변경할때마다 리렌더링이 발생하기에 비추천함.
defaultValues는 form의 기본값을 지정할 때 사용한다.

shouldFocusError => 유효성 검사에서 실패되었을때, 실패한 요소에 focus를 지정할지 여부를 설정한다.

반환값 객체

- register : 유효성 검사를 위한 Dom요소을 등록한다. 이름과 유효성 검사 옵션을 지정한다.
  {...register('이름', {
  required: true, // 반드시 입력해야할지 설정
  message: string, // error 메시지 설정함.,
  maxLength: {
  value: 2, // 최대 입력 가능한 수 지정
  message: '' // 에러 발생시 메시지
  },
  minLenght: {
  value: 10, // 최소 입력해야할 수 지정
  message: ''
  },
  max: {
  value: 1000, // 만약 number타입일 때 최대 수를 지정, (min과 동일)
  message: ''
  },
  pattern: {
  value: RegExp, // 정규식을 이용하여 유효성 검사
  message: ''
  }
  ...
  })}

error.message의 경우 javascript은 p태그로 감싸져서 반환되나, typescript는 string이다.

(react-hook-form참고)[https://2mojurmoyang.tistory.com/221#8.10.%20register%20Options%C2%A0:%20onChange]

로그인 화면에 useForm을 사용하여 처리한 예시이다.

```tsx
'use client';
import { useForm } from 'react-hook-form';
import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Text from '@components/atoms/Text';
import Box from '@components/layout/Box';

interface ISigninFormProps {
  onSignin: (username: string, password: string) => void;
}

interface ISigninFormData {
  username: string;
  password: string;
}

const SigninForm = ({ onSignin }: ISigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormData>({ mode: 'onSubmit' });
  return (
    <form onSubmit={handleSubmit(({ username, password }) => onSignin(username, password))}>
      <Box>
        <Input
          type="text"
          id="username"
          placeholder="아이디"
          {...register('username', { required: '아이디는 필수입니다.' })}
          hasError={!!errors.username}
        ></Input>
        {/* validation에 체크될 경우... */}
        {errors.username && (
          <Text color="danger" variant="small">
            {errors.username.message}
          </Text>
        )}
      </Box>
      <Box>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          hasError={!!errors.password}
          {...register('password', {
            required: '비밀번호 입력은 필수입니다.',
            minLength: {
              value: 5,
              message: '최소 5글자 입력합니다.',
            },
            maxLength: {
              value: 15,
              message: '최대 15글자 이내로 입력합니다.',
            },
          })}
        ></Input>
        {errors.password && (
          <Text color="danger" variant="small">
            {errors.password.message}
          </Text>
        )}
      </Box>
      <Box>
        <Button type="submit">로그인</Button>
      </Box>
    </form>
  );
};

export default SigninForm;
```

## 템플릿 구현

템플릿은 페이지의 레이아웃을 구현한다.
Layout컴포넌트은 Header, Footer, children컴포넌트로 구성된다.
템플릿은 보통 1개만 존재하나, 여러 템플릿이 필요할땐 여러 템플릿을 만든다.

next13의 경우 layout.tsx파일을 통해 레이아웃을 구성할 수 있다.

### 페이지 설계 구현

next13이전의 경우 src/pages내에서 페이지 컴포넌트를 구현하였으나,
next13에서는 app디렉터리 모든 곳에서 page.tsx를 통해 페이지를 구성할 수 있다.

### 6.9.1

현재 샘플을 확인하면 next/router의 useRouter훅을 사용하여 리다이렉트 처리하도록 구성되어있음.

정적인 메타데이터를 생성하기 위해서는
generateMetadata를 호출하여 Metadata객체를 반환하거나, metadata라는 이름의 객체를 만든 후 export한다.

```tsx
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: '123',
  };
}

// or
export const metadata: Metadata = {
  title: '123',
};
```

### You have a Server Component that imports next/router. Use next/navigation instead.

-> next/navigation의 useRouter를 사용한다.

### next/navigation의 useRouter

```tsx
'use client';

import { useRouter } from 'next/navigation';
import SigninFormController from '@/app/controllers/SigninFormController';

const SigninLayout = () => {
  const router = useRouter();

  // 인증 후 이벤트 핸들러
  const handleSignin = async (err?: Error) => {
    if (!err) {
      const redirectTo = '/';
      await router.push(redirectTo);
      // const redirectTo = (router.query['redirect_to'] as string) ?? '/';
      // console.log('Redirecting', redirectTo);
      // await router.push(redirectTo);
    }
  };
  return <SigninFormController onSignin={handleSignin} />;
};

export default SigninLayout;
```


// Next13에서는 getStaticProps, getStaticParams, getServerSideProps을 지원하지 않는다.
// Next.js13이전의 getStaticPaths와 비슷함.
// getStaticPaths => generateStaticParams => 빌드시 경로를 정적으로 생성한다.
// generateMetadata => 정적 메타데이터 설정
// getStaticProps => fetch의 catch force-cache를 사용해야함. (강제 캐시)
// getServerSideProps => fetch catch no-cache 캐시 사용안함.
// ISR의 경우 revalidate: ms지정한다.
/**
 * fetch(url, { revalidate: 10 })
 */

 ## A required parameter (id) was not provided as a string received number in generateStaticParams for /users/[id]
 [id]처럼 generateStaticParams통해 동적으로 경로를 생성할 때 반드시 문자열로?

 
 ## styled-components 와 SSR(Server Side rendering)
 현재 next.js13을 사용하여 서버사이드 렌더링을 구현하고 있음. 다만 styled-components는 클라이언트 사이드 렌더링만 제공됨.
 그래서 처음 렌더링될 때 styled-components가 적용되지 않은  순수 html이 보여줬다가, 클라이언트 사이드 렌더링 되었을때, 스타일이 적용됨

ServerStyleSheet
다행히도 Styled-Component는 stylesheet rehydration을 통한 concurrent server side rendering을 지원한다.

[Next.js v13 + Styled-Components](https://dev.to/rashidshamloo/using-styled-components-with-nextjs-v13-typescript-2l6m)

1. next.config.js에 styledComponents를 추가한다.
```js
 compiler: (() => {
    // styledcomponent활성화
    let compilerConfig = {
      styledComponents: true,
    };
    ...
 }
```

2. 글로벌 스타일 레지스트리
next.js모든 스타일을 수집하여, 태그에 적용하는 전역 스타일 레지스트리를 구현한다.
lib/registry.tsx을 생성하고 아래 코드를 추가한다.
```tsx
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

styled-components는 스타일시트 리하이드레이션과 함께 동시 서버 측 렌더링을 제공함.
ServerStyleSheet 콘텍스트 API와 함께

## Next13의 next/navigation
useRouter를 사용하기 위해서는 반드시 'use client'을 추가하여 클라이언트 렌더링으로 처리되어야함.
Next13이전에는 useRouter를 사용하여 쿼리스틑링을 수정하여 데이터를 패칭하였음.
Next13이 추가되면서 app디렉터리에서 사용할 경우 next/router을 import하는 것을 사용되지 않으며,
next/navigation을 import할 경우 useParam, useRouter, useSearchParams, ... 등등 방법으로 사용하도록 하였다.

### usePathname: 현 url을 문자열로 변환한다.


## json-server사용법

더미 데이터를 생성하여 서버로 띄울 수 있음.

npm i -D json-server

package.json의 script에 추가한다.
json-server --host 192.168.1.XXX my_file.json


## 검색 화면 구성
검색화면은 특정 쿼리에 해당하는 상품 리스트를 표시한다.
클라이언트 사이드에서 검색 결과를 얻는다.
pages/search/[...slug].tsx의 파일명은 search안에 모든 요청을 받기 위해서 작성한다.
next13의 경우 router.query를 갖기 위해서는 next/navigation의 useSearchParams을 호출하여 얻을 수 있다.

### Next.js의 Dynamic Routing으로 보임.
동적 데이터에서 경로로 생성할 경우, 요청시 채워지거나, 빌드시 미리 렌더링되는 동적 세그먼트가 있음.

사용법
1) 폴더 이름을 [id]라고 한다.
2) 그리고 해당 폴더에 page.tsx을 추가한다.
3) [id]의 경우 해당 url으로 들어오면 page.tsx를 브라우저에 렌더링한다.
4) 만약 [id]에 지정한 id를 Next.js컴포넌트에서 사용할 경우 인자 params으로 확인 하거나, next/navigation의 useParams을 통해 확인 가능함.

## Next.js getStaticProps와 getStaticPaths
getStaticProps와 getStaticPaths는 ssg방식에서 동적으로 static페이지를 생성하는 것으로
빌드 시 데이터를 fetch한 다음 static페이지를 생성한다.
- getStaticProps : 빌드 시 데이터를 fetch한 다음 정적 페이지 생성
- getStaticPaths는 [id]과 같이 동적 라우팅 페이지 중 빌드 시 static페이지를 생성한다.

## 컴포넌트 단위 테스트
기존에 만든 아톰, 몰리클, 오거니즘에 대한 단위 테스트를 작성한다.
컴포넌트에 대한 단위 테스트는 '컴포넌트명.spec.tsx'의 파일을 생성한다.
그 다음 @testing-library/react를 불러온다.
jest와 마찬가지로 테스트는 describe을 통해 테스트를 정의한다.
테스트 케이스는 descript의 콜백함수 안에 it 또는 test라는 이름의 함수를 정의하여 테스트 케이스를 지정한다.
beforeEach의 경우 렌더링 이전에 호출하는 함수, afterEach 테스트가 종료되었을때 호출하는 함수.

```
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
```

### Warning: Received `false` for a non-boolean attribute `isopen`. 해결법
styled-components을 사용하다보면 다음과 같은 warning을 경험할 수 있다.
나는 styled-components의 prop로 전달한것이지만, React나 HTML의 경우 attribute로 dom을 조작하는 것으로 희망하는 것으로 에러가 발생함.

다만 5.1부터 지원하는 transient props을 사용하여 해결 가능하다.

간단히, 내가 사용할 속성 명 앞에 $기호를 붙여서 DOM요소로 전달되지 않게 하는 방법이다.

### styled-component ThemeProvider
ThemeProvider는 react context api를 사용하여 만들어진 것으로 Context Api방식대로 Provider로 감싸진 자식 컴포넌트에 props을 전달받아서 사용할 수 있다.

# Chapter7 애플리케이션 개발 릴리즈 개선
이번 장에서 배울 내용
1. 헤로쿠(백엔드 json서버)와 버셀(Next.js 애플리케이션 배포) 서비스 배포
2. 로깅
3. SEO(검색 엔진 최적화) 대책
4. 접근성
5. 보안

프론트엔드와 백엔드를 나눈 구성은 현재 자주 볼 수 있는 아키텍처이다.
사용하는 서비스가 다를지라도 거의 해당 형태를 갖는 경우가 많다.

각 애플리케이션은 GIT REPOSITORY의 deploy hook을 사용하여 버셀과 헤로우에 배포된다.
프론트엔드 Next.js 애플리케이션은 빌드 및 배포 시 json서버 애플리케이션에 대해 요청을 보내 콘텐츠를 가져온다음 SSG를 수행한다.
그리고 정기적으로 업데이트 되는 일부 페이지는 SSG를 생성하고, ISR로 업데이트 한다. { fetch { next: { revalidate: 10 }}

사용자 인증과 같이 개별적으로 표현하는 콘텐츠는 클라이언트로부터 JSON서버에 요청을 보내 데이터를 조회하여 CSR을 수행하여 페이지를 렌더링한다.


## 헤로쿠 => koyeb
헤로쿠는 애플리케이션 개발부터 실행하여, 운용까지 모든 것을 제공하는 PaaS이다.
많은 개발자가 해당 서비스를 이용하여 애플리케이션 배포 및 관리 확장을 수행하고 있다.
효율성과 유연성도 뛰어나며 간단한 애플리케이션을 공개가능함.

우리는 테스트용 백엔드를 구성하기 때문에 json서버를 배포할때 사용한다.

다만 헤로쿠는 2022년 11월 28일 이후로 유료화가 되어 해당 서비스 대신 koyeb를 사용하기로 하였다.

무료로 사용가능하며, 기능들이 어느정도 잡혀있는것으로 보여서 해당 서비스를 선택하였다.
많은 사람들이 대체용으로 많이 사용하는 것으로 보임.

[참고]
https://cocobi.tistory.com/248

배포 결과 : https://varied-valene-choiminhyeok.koyeb.app/users

먼저 json-server를 처리하기 위한 서버를 생성하고, github repository에 추가한다.

koyeb의 경우 github의 레포지토리 또는 도커의 컨테이너 중에서 선택하여 배포가 가능함.

완전 간단하게 배포 가능함.

즉 해당 프로젝트에서 프로덕션으로 배포하기 위해서는 환경변수에서 해당 경로를 변경해야함.

## 버셀
Next.js 애플리케이션은 다양한 플랫폼으로 배포가 가능함.
가장 간단한 방법은 Next.js개발사가 만든 버셀을 사용하는 것이다.

버셀은 전세계에 에지 네트워크로(cdn)의 배포부터 협업 기능까지 웹 개발에 필요한 광범위한 기능을 제공하고 있다.
버셀은 단순 배포를 제공하는 것 뿐만 아니라 서버리스 ISR을 제공한다.

1. vercel.com/signup을 접속하여 계정을 생성하자.
2. 배포를 위해 현 프로젝트의 github 저장소를 선택하자.
3. 간단하게 배포가 완료됨. => 빌드 파이프라인이 실행되고, 빌드가 성공하면 배포가 완료됨.

버셀로 애플리케이션 배포
환경 변수 설정하는 파일을 새로 만든다. 버셀은 프로덕션으로 배포하기 때문에 이름은 .env.production이라고 정한다.

파일 내용은 다음과 같다.
```
API_BASE_URL = https://varied-valene-choiminhyeok.koyeb.app
NEXT_PUBLIC_API_BASE_PATH = /api/proxy
```

API_BASE_URL은 프로덕션 환경에서의 JSON서버 url을 지정한 것이다. 이전에 koyeb으로 배포한 url
NEXT_PUBLIC_API_BASE_PATH은 Next.js에서 프록시를 구현하기 위해서 그대로 둔다.

그 다음 Vercel사이트에 들어가서 계정이 없으면 새로 만들자.

아쉽게도 현재 해당 프로젝트가 organization의 repository이므로 조직원은 배포 할 수 없음. => 아쉽다. 포크를 해서 할까?

## 로깅
애플리케이션 로그는 작동하는 애플리케이션 상태, 발생한 이벤트, 에러등을 출력한다.
또한 사용자가 사용하는 현황이나, 에러감지를 위해서 로그를 수집한다.

Next.js의 서버 사이드와 클라이언트 사이드 모두 console.log를 사용할 수 있다. 다만 환경에 따라서 출력하는 위치가 달리된다.

generateStaticParams와 같은 ssg에서 동작하는 기능은 서버에서 실행하는 기준으로 출력된다.
반대로 클라이언트에서 화면 렌더링을 하게 되면 브라우저의 콘솔에서 확인이 가능함.

=> 즉 렌더링 방식에 따라 콘솔이 출력되는 위치가 달리된다.

로깅용 라이브러리를 사용함으로써, 특정 포멧에 맞는 로그를 출력하거나, 파일이나 외부로 로그를 출력할 수 있다.
log4j와 비슷한 기능인듯...

설치합시다. 두 라이브러리를 설치하자.

npm install pino pino-logflare 

콘솔 레벨
1. console.trace => 개발 시 디버그 정보 출력용 debug보다 상세하게 표시
2. console.debug => 개발시 디버그 정보 출력용
3. console.info => 양쪽에서 로그인이나, API 콜 등 정보를 주고받을때
4. console.warn => 처리 지속 가능하나, 바람직하지 않을때
5. console.error => api 콜 에러 및 실패하였을때
6. console.fatal => 크래시 등 웹 애플리케이션 실행 유지가 곤란한 아주 심각한 에러가 발생하였을때

## 접근성
웹 애플리케이션을 어떤 사람이든지 사용하도록 해야함.
사용자는 다양한 장치 와 도구를 사용하여 서비스를 접근한다.
시각장애가 있는 사용자는 스크린 리더를 통해 화면에 있는 텍스트를 읽어주거나,
마우스 같은 도구를 사용할 수 없을 때, 헤드 포인터를 이용하거나, 키보드만 가지고 사용하는 경우도 있다.

적절한 요소나 구조로 콘텐츠를 표시하는것이나, 보조적인 데이터를 속성으로 부여하는 방법도 좋다.

W3C에서 해당 가이드라인을 제공하고 있음.

### 시맨틱
의미론적인이라는 뜻으로 적절한 HTML태그를 사용함으로써 해당 요소의 역할을 적절히 전달할 수 있음.
버튼을 구성할 때, button태그를 사용하나, div로도 동일하게 만들 수 있음.
다만 tab키를 이용하여 button에 접근해야할 때 div요소는 기본적으로 tab으로 접근할 수 없음.
또한 스크린 리더가 해당 요소가 버튼인지 알 수 없음.

적절히 HTML5요소를 사용하는 것을 권장함.
- header : 헤더 부분을 의미, 제목이나 메뉴를 표시한다. body 태그의 바로 아래에 배치한다.
- main : 페이지의 주요한 콘텐츠 부분
- footer : 푸터 영역을 의미, 콘텐츠의 저작자와 관련 링크 배치
- section : 독립적인 콘텐츠
- article : 1개의 아티클, 답글, 상품 카드 등 같은 유형이 여러개 일때
- nav : 링크를 제공하기 위한 태그

- mark : 텍스트를 강조하기 위해 사용함.

보조 텍스트
이미지를 표시할 때 시각 장애를 가진 사람의 경우 이미지를 볼 수 없기 때문에, alt속성을 사용하면 스크린 리더가
해당 url이 아닌 alt속성값을 읽기 때문에 사용하는 것을 권장한다.

```html
<img src="이미지 링크" alt="대체 메시지">
```

입력 라벨
input요소와 label을 사용해야한다.
label의 for속성값과 input id을 매칭해야함.
입력창에 무엇을 입력해야하는지 알려면 label태그를 사용한다.

react의 경우 for가 아닌 htmlFor를 사용해야한다. (javascript 예약어) 라벨과 인풋을 연결한다.
=> react 컴포넌트에 클래스를 지정하려면 class속성이 아닌 className을 사용한다.

## WAI-ARIA => 웹 접근성 규격
w3c에서 결정한 웹 접근성 규격이다.
역할과 속성, 상태와 같은 3개의 유형으로 구성

### 역할(Role) => 요소의 역할 부여
요소가 어떤 역할을 할지 role속성을 사용한다.
역할의 종류는 다양하다.
새로운 유형 또는 기존 시맨틱을 요소에 부여한다.
<form id="search" role="search">
  <input id="search-input" type="search" name="search" spellcheck="false">
  <input type="submit" value="검색">
</form>

### 속성 (Property)
요소의 특성을 정의해서 추가적인 의미를 부여
aria-label을 지정하여 요소의 라벨을 지정, 설명을 부여한다.

### 상태 (state)
요소의 상태를 의미한다.
속성과 달리 변화된다.
aria-selected, aria-expanded, aria-hidden => 상태값은 변화된다.

리액트는 wai-aria 속성을 지원한다. aria-*형태로 사용한다.
기본적으로 속성명은 케밥 케이스로 기술한다. 리액트는 기본적으로 카멜 케이스로 지정하는데, 다르다.

## 보안 (Security)
웹 애플리켕션은 누구든지 접속할 수 있다보니 사이버 공격을 당하기 쉽다.
Next.js를 통해 대첵을 알아보자.

1. XSS공격(크로스 사이트 스크립팅)
개발자가 의도핮 않은 스크립트가 실행되는 취약점 => 의도하지 않은 스크립트 실행
예를 들어 INPUT태그가 있을때 여기에 스크립트를 입력할 때 스크립트가 실행되었던 적이 있었음.
=> Escape 처리하도록 개선함. 예) <  => &lt; > => &gt;
특정 문자를 원래의 기능에서 벗어나도록 변환하는 행위를 이스케이프라고함.

리액트의 경우 dangerouslySetInnerHTML을 사용할경우 기본적으로 이스케이프된 상태로 처리되므로, HTML에 포함된 값은 그대로 푯한다.

CSRF => 크로스 사이트 요청 위조
사용자가 의도핮 않은 형태로 요청 또는 정보를 전송

웹 브라우저에는 다양한 보안 대첵이 강구되어 있다. 특정 http헤더를 사용하여 활성화가 가능함.
next.config.js에서 설정 가능함.

## 부가 설명
캐리지 리턴 (Carriage Return)
윈도우와 리눅스(맥)의 줄 개행 처리 방식이 다르다.
윈도우는 CRLF (Carriage Return Line Feed) \r\n
리눅스 LF (Line Feed) \n

그래서 협업하는 경우 줄 개행 처리 방식을 통일화 해야한다. 주로 LF로 변경하는 것을 권장하는듯.

1. .eslintrc.js에서 endOfline속성을 추가한다. 'auto'

## vercel 서버 deploy
1. env파일 관련 등록
vercel사이트에서 setting페이지 들어간다.

https://velog.io/@yena1025/vercel%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%9C-%EC%95%B1%EC%97%90-.env%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

## 로깅
로깅 : 애플리케이션 상태, 이벤트, 에러 등 로그를 수집하거나, 외부로 export할 수 있도록 기능을 제공함.
 Next.js은 렌더링 방식이 클라이언트와 서버 방식으로 나뉘어있어, 로그가 표시되는 곳이 다르다.
 예를 들어 클라이언트 렌더링(CSR)의 경우 JS를 서버로부터 다운로드받아서 클라이언트에서 JS를 실행하여 렌더링을 하기에 콘솔로그가 개발자 도구에 표시됨.
 다만 서버 사이드 렌더링의 경우 렌더링된 HTML을 서버로부터 클라이언트에 전달하기 때문에 개발자도구에서 콘솔내용을 확인할 수 없다.

Next.js에서 로깅을 사용학 위해서 pino, pino-logfare 같이 사용한다.

 logflare vs sentry

 1. 로그 플레어에 들어가서 API KEY를 받는다.
 2. .env 파일에 API_KEY를 추가한다.
    Next.js에서 환경 변수명은 반드시 NEXT_을 접두사로 사용한다.
 3. .env에 추가한 환경변수를 사용할 경우 'process.env.환경변수명'으로 참조한다.

 4. app/utils/logger.ts 파일 생성
 5. 로거 초기화 로직 작성
 6. pino라이브러리에서 pino (export default)을 불러온다.
 7. pino_logflare에서 createWriteStream, createPinoBrowserSend를 불러온다.

1. pino
vercel에서 만든 로깅 라이브러리


2. vercel로 배포 시, 프로젝트에 직접 pino-logflare 설정
빌드 시 로그나 CDN으로 접근 로그 등 자동적으로 로그플레어에 집약가능.