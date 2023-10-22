/**
 * 로깅 : 애플리케이션 상태, 이벤트, 에러 등 로그를 수집하는 것. 또는 외부로 EXPORT할 수 있음.
 * Next.js은 렌더링 방식이 클라이언트와 서버 방식으로 나뉘어있어, 로그가 표시되는 곳이 다르다.
 * 예를 들어 클라이언트 렌더링(CSR)의 경우 JS를 서버로부터 다운로드받아서 클라이언트에서 JS를 실행하여 렌더링을 하기에 콘솔로그가 개발자 도구에 표시됨.
 * 다만 서버 사이드 렌더링의 경우 렌더링된 HTML을 서버로부터 클라이언트에 전달하기 때문에 개발자도구에서 콘솔내용을 확인할 수 없다.
 *
 * Next.js에서 로깅을 사용학 위해서 pino, pino-logfare 같이 사용한다.
 *
 *
 * logflare vs sentry
 *
 *
 * 1. 로그 플레어에 들어가서 API KEY를 받는다.
 * 2. .env 파일에 API_KEY를 추가한다.
 *  Next.js에서 환경 변수명은 반드시 NEXT_을 접두사로 사용한다.
 * 3. .env에 추가한 환경변수를 사용할 경우 'process.env.환경변수명'으로 참조한다.
 *
 * 4. app/utils/logger.ts 파일 생성
 * 5. 로거 초기화 로직 작성
 * 6. pino라이브러리에서 pino (export default)을 불러온다.
 * 7. pino_logflare에서 createWriteStream, createPinoBrowserSend를 불러온다.
 */

import pino from 'pino';
import { createWriteStream, createPinoBrowserSend } from 'pino-logflare';

// createWriteStream apikey와 sourceToken 등록
// apiKey는 string을 원하지만 process.env. 환경변수가 string 또는 undefined일 수 있다.
// 해결 책은 인터페이스를 변경하거나, as연산자를 통해 타입을 강제하던가, 널 병합 연산자로 undefined이면 문자열을 병합하도록 해야함.
// !연산자를 피연산자 뒤에 추가함으로써 해당 피연산자가 non-nullable임을 알린다.

type LogFlareConfigKey = 'apiKey' | 'sourceToken';

const config: Record<LogFlareConfigKey, string> = {
  // logflare의 api key
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_API_KEY as string,
  // sourceToken : 로그를 전송하는 소스의 id
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE_ID as string,
};

const stream = createWriteStream(config);

// createPinoBrowserSend : 브라우저에서 로그 이벤트를 내보낸다.
const send = createPinoBrowserSend(config);

const logger = pino(
  {
    browser: {
      transmit: {
        level: 'info',
        send,
      },
      level: 'debug',
      base: {
        env: process.env.NODE_ENV,
      },
    },
  },
  stream,
);

export default logger;
