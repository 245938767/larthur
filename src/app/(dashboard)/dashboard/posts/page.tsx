'use client';

import { Container } from '@/components/ui/Container';
import { DataTable } from '@/components/common/data-table';

import { usePostsQuery } from './usePosts';
import usePostTable from './usePostTable';

export default function Posts() {
  const { columns } = usePostTable();
  const { data, isLoading } = usePostsQuery();
  return (
    <Container className="mt-10">
      <div className="container  py-10">
        <div className="flex w-full justify-end"></div>
        <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
      </div>
    </Container>
  );
}
