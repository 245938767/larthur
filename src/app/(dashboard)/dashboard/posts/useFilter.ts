import { proxy } from 'valtio';

export const PostsState = proxy<{
  title?: string;
  slug?: string;
  description?: string;
  categoryId?: number;
  limit: number;
}>({
  title: undefined,
  slug: undefined,
  description: undefined,
  categoryId: undefined,
  limit: 5,
});

export default function useFilter() {}
