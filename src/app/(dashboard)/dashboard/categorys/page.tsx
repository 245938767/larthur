import { getCategoryAllMany } from '@/api/categoryApi';

import { Container } from '@/components/ui/Container';

import { columns } from './columns';
import CreateCategory from './CreateCategory';
import { DataTable } from './data-table';

export default async function Categorys() {
  const data = await getCategoryAllMany();
  return (
    <Container className="mt-10">
      <div className="container  py-10">
        <div className="flex w-full justify-end">
          <CreateCategory />
        </div>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </Container>
  );
}
