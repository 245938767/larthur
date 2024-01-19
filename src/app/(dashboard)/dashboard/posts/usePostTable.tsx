import Link from 'next/link';
import { DeleteBlogPostsForSlug } from '@/api/postsApi';
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import PopOverButton from '@/components/ui/PopoverButton';

import { useRefetchPosts } from './usePosts';

export default function usePostTable() {
  const refetch = useRefetchPosts();
  const { mutate: deleteMutation } = useMutation({
    mutationFn: DeleteBlogPostsForSlug,
    onSuccess: () => {
      refetch();
    },
    onError: () => {},
  });
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
              <Button
                variant="secondary"
                href={`/dashboard/create/${row.original.slug}`}
              >
                Edit
              </Button>
              <PopOverButton
                call={() => {
                  deleteMutation({ slug: row.original.slug });
                  refetch();
                }}
                data={row.original.id}
              />
            </div>
          </>
        );
      },
    },
  ];
  return { columns };
}
