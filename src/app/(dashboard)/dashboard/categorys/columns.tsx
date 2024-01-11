'use client';

import { CategoryWithCount, deleteCategory } from '@/api/categoryApi';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';

export const columns: ColumnDef<CategoryWithCount>[] = [
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
          <div>
            <Button variant="secondary" onClick={() => {}} className="mr-1">
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                deleteCategory({ id: payment.id });
              }}
              className="ml-1"
            >
              Delete
            </Button>
          </div>
        </>
      );
    },
  },
];
