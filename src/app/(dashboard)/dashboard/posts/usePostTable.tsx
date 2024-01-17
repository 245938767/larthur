import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';

export default function usePostTable() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'mainImage',
      header: 'Image',
      cell(props) {
        const data = Buffer.from(props.row.original?.mainImage?.data).toString(
          'utf-8'
        );
        return (
          <>
            <Avatar>
              <Avatar>
                <AvatarImage src={data} alt="" />
                <AvatarFallback>Title</AvatarFallback>
              </Avatar>
            </Avatar>
          </>
        );
      },
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell(props) {
        return (
          <>
            {' '}
            <Link href={`/blog/${props.row.original.slug}`}>
              {props.row.original.slug}
            </Link>
          </>
        );
      },
    },
    {
      accessorKey: 'Category.name',
      header: 'Category',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      id: 'actions',
      enableHiding: false,
      cell({ row }) {
        return (
          <>
            <div className="flex items-baseline justify-around">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </>
        );
      },
    },
  ];
  return { columns };
}
