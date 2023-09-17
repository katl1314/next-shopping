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
