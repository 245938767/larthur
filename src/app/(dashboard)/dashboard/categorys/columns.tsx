'use client';

import { useState } from 'react';
import { CategoryWithCount, deleteCategory } from '@/api/categoryApi';
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { clsxm } from '@/lib/helper';
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useRefetchCategory } from './useCategory';

interface UsePopOverButtonProps {
  call: () => void;
  data: CategoryWithCount;
}

const PopOverButton: React.FC<UsePopOverButtonProps> = ({ call, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <a
            className={clsxm(
              'inline-flex items-center gap-2 justify-center text-sm outline-offset-2 transition active:transition-none',
              'group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
            )}
            href="#"
          >
            Delete
          </a>
        </PopoverTrigger>
        <PopoverContent>
          <div className="mb-4">
            <h1 className="block text-xl text-black dark:text-white">
              Are you sure to delete it
            </h1>
          </div>
          <div className="flex w-full justify-end">
            <Button
              variant="secondary"
              className="hover:text-red-700"
              onClick={() => {
                if (data.blogContentCount > 0) {
                  toast.warning('category relation blog');
                  setOpen(false);
                  return;
                }
                call();
              }}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
              className="ml-2 hover:text-black"
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
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
            <div className="flex items-center">
              <Button variant="secondary" onClick={() => {}} className="mr-1">
                Edit
              </Button>
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
