import useSWR from 'swr';
import type { Product, ApiContext, Category } from '@/app/types';
import { fetcher } from '@/app/utils/fetcher';

export interface IUseProductProps {
  category: Category;
  limit?: number;
  page?: number;
}

export const useProducts = (context: ApiContext, props: IUseProductProps) => {
  const params = new URLSearchParams();
  params.append('category', props.category);
  const path = `${context.apiRootUrl}/products?${params.toString()}`;
  const { data, error } = useSWR<Product[]>(path, fetcher);

  return {
    data: data ?? [],
    isLoading: !data && !error,
    error: error,
  };
};

export const useProduct = (context: ApiContext, id: string) => {
  const { data, error } = useSWR<Product>(`${context.apiRootUrl}/products/${id}`, fetcher);

  return {
    data: data ?? ({} as Product),
    isLoading: !data && !error,
    error: error,
  };
};
