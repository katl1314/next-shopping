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
    return <div>{data?.name}!</div>
}