import { getCategoryAllMany } from '@/api/categoryApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchCategory = async ({ queryKey: [, params] }: { queryKey: any[] }) => {
  const response = await getCategoryAllMany(params ?? {});
  return response;
};
const baseKey = 'CATEGORY_QUERY_KEY';
export const userDeptQueryKeys = {
  base: [baseKey],
  tree: [baseKey, 'tree'],
  filter() {
    return [...userDeptQueryKeys.base];
  },
};

function useCategoryQuery() {
  const query = useQuery({
    queryKey: userDeptQueryKeys.base,
    queryFn: fetchCategory,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
  };
}
function useRefetchCategory() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: userDeptQueryKeys.base });
}

export { useCategoryQuery, useRefetchCategory };
