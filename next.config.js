/** @type {import('next').NextConfig} */
const nextConfig = {
  // 리액트 엄격모드 프로그램의 잠재적인 문제를 강조하기 위한 개발모드 <React.StrictMode>
  reactStrictMode: true,
  /**
   * compiler: {
   *    styledComponents?: boolean, // styled-components 사용 여부
   *    displayName?: boolean, //
   *    ssr?: boolean,
   *    fileName?: boolean;
   *    topLevelImportPaths: string[],
   *    ...
   * }
   * https://nextjs.org/docs/architecture/nextjs-compiler
   *
   * reactRemoveProperties : 리액트 속성 제거
   *  - boolean
   *  - 만약 사용자 속성을 제거하기 위해서는? (정규식에 해당하는 속성을 제거)
   *  reactRemoveProperties: { properties: ['^data-custom$']},
   *
   *  removeConsole: true : 모든 로그 삭제
   *  {
   *      exclude: ['error'], // 특정 log를 제외하고 삭제
   *  }
   */
  compiler: (() => {
    // styledcomponent활성화
    let compilerConfig = {
      styledComponents: true,
    };

    if (process.env.NODE_ENV === 'production') {
      // 프로덕션 환경
      compilerConfig = {
        ...compilerConfig,
        // 프로덕션 환경에서는 리엑트 테스팅 라이브러리에서 사용하는 data-testid속성을 삭제
        reactRemoveProperties: { properties: ['^data-testid$'] },
      };
    }
    return { ...compilerConfig, removeConsole: true };
  })(),
  // Proxy처리 관련해서 추가함.
  // rewrites : 재작성
  // 재작성을 사용시 요청 경로를 다른 대상 경로에 매핑할 수 있다.
  // source형태로 들어온 경로를 destination경로로 매핑하는것?
  // - source : 들어오는 경로
  // - destination : 라우팅할 경로
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`, // /api/proxy/:path*
        destination: `${process.env.API_BASE_URL}/:path*`, // https://127.0.0.1:5000/:path*
      },
    ];
  },
};

module.exports = nextConfig;
