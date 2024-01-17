import { getLatestBlogPostsQuery } from '@/api/postsApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { PostsState } from './useFilter';

const fetchPosts = async ({ queryKey: [, params] }: { queryKey: any[] }) => {
  const response = await getLatestBlogPostsQuery(params);
  return response;
};
const baseKey = 'POSTS_QUERY_KEY';
export const userPostsQueryKeys = {
  base: [baseKey],
  filter(params: any) {
    const { ...rest } = params || {};
    const filter = {
      ...rest,
    };

    return [...userPostsQueryKeys.base, { ...filter }];
  },
};

function usePostsQuery() {
  const data = useSnapshot(PostsState);
  const query = useQuery({
    queryKey: userPostsQueryKeys.filter({ data }),
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
  };
}
function useRefetchPosts() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: userPostsQueryKeys.base });
}

export { usePostsQuery, useRefetchPosts };
