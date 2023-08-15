/**
 * 데이터를 가져오는 유틸함수
 * @param resource API서버 경로 및 RequestInfo객체
 * @param init api요청 설정값
 * @returns 데이터
 */
export const fetcher = async <T>(resource: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(resource, init);

  if (!res.ok) {
    // 요청 실패시?
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
