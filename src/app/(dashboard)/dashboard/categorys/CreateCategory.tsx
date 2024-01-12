'use client';

import { useState } from 'react';
import { createCategory } from '@/api/categoryApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name must be at least 1' }).max(10),
  type: z.string({
    required_error: 'Type is required',
  }),
  slug: z.string({
    required_error: 'Slug is required',
  }),
});
export default function CreateCategory() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      slug: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // open loading
    submitData({ ...values });
  }

  const { mutateAsync: submitData } = useMutation({
    mutationFn: createCategory,
    onSuccess(data: 'sucess' | 'name already exist' | 'create error') {
      if (data != 'sucess') {
        if (data === 'name already exist') {
          form.setError('name', {
            message: data,
          });
          return;
        }
        form.setError('root', { message: data });
        return;
      }
      // close loading
      // close the popover
      setOpen(false);
    },
    onError(error: any) {
      // close loading
      // show error
      toast.error('Something went wrong:' + error);
    },
  });
  const theOpneChange = (opne: boolean) => {
    setOpen(opne);
    if (!opne) {
      form.reset();
    }
  };
  return (
    <div className=" mb-2">
      <Popover open={open} onOpenChange={theOpneChange}>
        <PopoverTrigger asChild>
          <div className="mb-1">
            <a
              className="group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
              href="#"
            >
              Create
            </a>
          </div>
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
                <Button type="submit" variant="secondary">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
