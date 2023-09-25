import useSWR from 'swr';
import type { Product, ApiContext, Category } from '@/app/types';
import { fetcher } from '@/app/utils/fetcher';

export interface IUseProductProps {
  category: Category;
  limit: number;
  page: number;
}

export const useProducts = (context: ApiContext, props: IUseProductProps) => {
  const { data, error } = useSWR<Product>(`${context}/${props.category}`, fetcher);

  return {
    data: data ?? [],
    isLoading: !data && !error,
    error: error,
  };
};
