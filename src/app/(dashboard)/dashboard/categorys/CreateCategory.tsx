'use client';

import { useState } from 'react';
import { createCategory } from '@/api/categoryApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { clsxm } from '@/lib/helper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SubmitButton, { SubmitButtonState } from '@/components/ui/SubmitButton';

import { useRefetchCategory } from './useCategory';

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Name must be at least 1' }).max(10),
  type: z
    .string({
      required_error: 'Type is required',
    })
    .optional(),
  slug: z
    .string({
      required_error: 'Slug is required',
    })
    .optional(),
});
export default function CreateCategory({
  value,
  className,
  children,
}: {
  value?: Category;
  children: React.ReactNode;
  className?: string;
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const [buttonState, setButtonState] = useState<SubmitButtonState>('Normal');
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: value?.id,
      name: value?.name ?? '',
      type: value?.type ?? '',
      slug: value?.slug ?? '',
    },
  });

  const refetch = useRefetchCategory();
  function onSubmit(values: z.infer<typeof categorySchema>) {
    // open loading
    setButtonState('Loading');
    submitData({ ...values });
  }
  const restData = () => {
    setButtonState('Normal');
    form.reset();
  };

  const { mutateAsync: submitData } = useMutation({
    mutationFn: createCategory,
    onSuccess(
      data: 'sucess' | 'name already exist' | 'create error' | 'update error'
    ) {
      if (data != 'sucess') {
        if (data === 'name already exist') {
          form.setError('name', {
            message: data,
          });
          setButtonState('Error');
          return;
        }
        form.setError('root', { message: data });
        setButtonState('Error');
        return;
      }
      setButtonState('Success');
      // close loading
      refetch();
      // close the popover
      setTimeout(() => {
        setOpenPopover(false);
        restData();
      }, 1000);
    },
    onError(error: any) {
      // close loading
      setButtonState('Error');
      form.setError('root', { message: error });
      // show error
      toast.error('Something went wrong:' + error);
    },
  });
  const theOpneChange = (opne: boolean) => {
    setOpenPopover(opne);
    if (!opne) {
      restData();
    }
  };
  return (
    <div className=" mb-2">
      <Popover open={openPopover} onOpenChange={theOpneChange}>
        <PopoverTrigger asChild>
          <a
            className={clsxm(
              'inline-flex items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
              'group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
              className
            )}
            href="#"
          >
            {children}
          </a>
        </PopoverTrigger>
        <PopoverContent className="bg-white dark:bg-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter type" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Icon ex😋" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <SubmitButton buttonState={buttonState} type="submit">
                  Submit
                </SubmitButton>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
