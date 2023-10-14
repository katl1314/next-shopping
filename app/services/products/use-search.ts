import useSWR from 'swr';
import { ProductCardListContainerProps } from '@/app/containers/ProductCardListContainer';
import type { ApiContext, Product } from '@/app/types';
import { fetcher } from '@/app/utils/fetcher';

interface SearchReturn {
  products: Product[];
  isError: boolean;
  isLoading: boolean;
}

const useSearch = (
  context: ApiContext,
  { category, conditions }: ProductCardListContainerProps,
): SearchReturn => {
  // URLSearchParams는 URL의 query parameter관련해서 처리한다.
  const params = new URLSearchParams();

  if (conditions !== undefined) {
    conditions.forEach(condition => params.append('conditions', condition));
  }

  category && params.append('category', category);

  const path = `${context.apiRootUrl.replace(/\$/g, '')}/products`;
  const { data, error, isLoading } = useSWR<Product[]>(`${path}?${params.toString()}`, fetcher);

  return {
    products: data ?? ([] as Product[]),
    isError: !!error, // error or undefined
    isLoading: !error && isLoading,
  };
};

export default useSearch;
