export enum HTTPMethod {
  Post = 'POST', // 새로운 리소스 생성 (body에 데이터를 담아서 가져감.)
  Get = 'GET', // api서버에 데이터를 참조하기 위해서 사용함. (queryString에 데이터를 전달하여 데이터를 읽을때만 사용함) => 읽기 또는 검색용
  Patch = 'PATCH', // api서버의 데이터의 일부를 업데이트
  Put = 'PUT', // api서버의 데이터의 모든 것을 업데이트
  Delete = 'Delete', // api서버의 데이터를 삭제
}

export enum PromiseState {
  Pending = 'pending',
  Success = 'success',
  Fail = 'fail',
}

export function promiseResolver<T>(promise: Promise<T>) {
  let status = PromiseState.Pending;
  let response: T | null = null;

  const suspense = promise.then(
    res => {
      // success
      status = PromiseState.Success;
      response = res;
    },
    err => {
      status = PromiseState.Fail;
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case PromiseState.Pending:
        // 데이터 패칭 중이면 promise객체를 자신을 호출한 함수에 책임을 넘긴다.
        throw suspense;
      case PromiseState.Fail:
        // response에 error객체가 담겼으며, read함수를 호출하는 놈에게 책임을 넘긴다.
        throw response;
      case PromiseState.Success:
        return response; // 정상적인 데이터는 반환하자.
    }
  };

  return { read };
}
