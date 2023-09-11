// ssg 생성되지 않은 페이지 접근시 작업 여부를 제어.
export const dynamicParams = false;

interface IUserParams {
  id: string;
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

async function fetchData(params: { id: string }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    cache: 'force-cache', // 한번 조회하면 이후에는 캐시된 데이터를 재사용한다.
  });
  const data = await res.json();
  return data;
}

export default async function Page({
  params,
}: {
  params: IUserParams;
  children?: React.ReactNode;
}) {
  const data = await fetchData(params);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-gray-100">{data.title}</h1>
      <p className="font-medium text-gray-400">{data.body}</p>
    </div>
  );
}
