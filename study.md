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

## Prettier 설정 관련 정리

{
"arrowParens": "avoid", // 화살표 함수 괄호 사용 방식 "avoid" | "always"
"bracketSpacing": false, // 객체 리터럴에서 괄호에 공백 삽입 여부
"endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름 => 개행처리 관련 속성
"htmlWhitespaceSensitivity": "css", // HTML 공백 감도 설정
"jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
"jsxSingleQuote": false, // JSX에 singe 쿼테이션 사용 여부
"printWidth": 80, // 줄 바꿈 할 폭 길이
"proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
"quoteProps": "as-needed" // 객체 속성에 쿼테이션 적용 방식
"semi": true, // 세미콜론 사용 여부
"singleQuote": true, // single 쿼테이션 사용 여부
"tabWidth": 2, // 탭 너비
"trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
"useTabs": false, // 탭 사용 여부
"vueIndentScriptAndStyle": true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
"parser": '', // 사용할 parser를 지정, 자동으로 지정됨
"filepath": '', // parser를 유추할 수 있는 파일을 지정
"rangeStart": 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
"rangeEnd": Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
"requirePragma": false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
"insertPragma": false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
"overrides": [
{
"files": "*.json",
"options": {
"printWidth": 200
}
}
], // 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용
}
