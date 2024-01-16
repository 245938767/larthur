'use client';

import { Container } from '@/components/ui/Container';

import { columns } from './columns';
import CreateCategory from './CreateCategory';
import { DataTable } from './data-table';
import { useCategoryQuery } from './useCategory';

export default function Categorys() {
  const { data, isLoading } = useCategoryQuery();
  return (
    <Container className="mt-10">
      <div className="container  py-10">
        <div className="flex w-full justify-end">
          <CreateCategory />
        </div>
        <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
      </div>
    </Container>
  );
}
