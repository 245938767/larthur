'use client';

import { Container } from '@/components/ui/Container';
import { DataTable } from '@/components/common/data-table';

import useCategoryColumn from './columns';
import CreateCategory from './CreateCategory';
import { useCategoryQuery } from './useCategory';

export default function Categorys() {
  const { columns } = useCategoryColumn();
  const { data, isLoading } = useCategoryQuery();
  return (
    <Container className="mt-10">
      <div className="container  py-10">
        <div className="flex w-full justify-end">
          <CreateCategory className="mb-1">Create</CreateCategory>
        </div>
        <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
      </div>
    </Container>
  );
}
