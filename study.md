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
[참고 사이트](https://velog.io/@pixartive/%EC%99%9C-%EC%83%88%EB%A1%9C%EC%9B%8C%EC%A7%84-nextImage%EB%8A%94-%EB%8D%94%EC%9D%B4%EC%83%81-objectFit%EC%9D%84-%ED%95%84%EC%9A%94%EB%A1%9C-%ED%95%98%EC%A7%80-%EC%95%8A%EA%B2%8C-%EB%90%90%EC%9D%84%EA%B9%8C
)
72
next.js13에서 Image컴포넌트의 objectFit 미지원 
legacy버전에서는 이미지의 크기를 알수 없기에, props로 layout="fill"을 추가했어야함  => 부모요소의 position을 가지고 크기를 결정함.
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
 const inter = Inter( {
  subsets: ['latin'], //  latin, greek, vietnamese
  weight: 700
 })
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