'use client';

import { CategoryWithCount, deleteCategory } from '@/api/categoryApi';
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';

import PopOverButton from '@/components/ui/PopoverButton';

import CreateCategory from './CreateCategory';
import { useRefetchCategory } from './useCategory';

function useCategoryColumn() {
  const refetch = useRefetchCategory();
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      refetch();
    },
    onError: () => {},
  });
  const columns: ColumnDef<CategoryWithCount>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
    },
    {
      accessorKey: 'blogContentCount',
      header: 'BlogRelation',
      cell: ({ getValue }) => {
        return <div className="flex justify-center">{getValue<number>()}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell({ row }) {
        const payment = row.original;
        return (
          <>
            <div className="flex items-center justify-center">
              <CreateCategory
                key={payment.id}
                className="mr-2 mt-2"
                value={payment}
              >
                Edit
              </CreateCategory>
              <PopOverButton
                call={() => {
                  deleteMutation({ id: payment.id });
                  refetch();
                }}
                data={payment}
              />
            </div>
          </>
        );
      },
    },
  ];
  return { columns };
}
export default useCategoryColumn;
