'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCategorys } from '@/api/categoryApi';
import { createBlogPost, getBlogPostsCountQuery } from '@/api/postsApi';
import { PostFormSchema } from '@/api/PostsIndex';
import portraitImage from '@/assets/Portrait.png';
import { Listbox, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import ColorThief from 'colorthief';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { proxy, useSnapshot } from 'valtio';
import { z } from 'zod';

import { rgbToHex } from '@/lib/rgb';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';
import PlateEditor from '@/components/plate-editor';

const BlogPostZod = z
  .object({
    image: z.string().min(0),
  })
  .merge(PostFormSchema);
const pageState = proxy<{
  categorySelect: Category[];
}>({
  categorySelect: [],
});
const defaultValues = {
  title: '',
  slug: '',
  description: '',
  readingTime: 1,
  mainImage: undefined,
  mainImageUrl: '',
  mainImagebgColor: undefined,
  mainImagefgColor: '#fff',
  categoryId: 0,
  image: undefined,
  body: [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ],
};
export default function CreateArticle({ value }: { value?: any }) {
  const [createButon, setCreateButon] = useState<
    'Normal' | 'Loading' | 'Error' | 'Success'
  >('Normal');
  const form = useForm<z.infer<typeof BlogPostZod>>({
    resolver: zodResolver(BlogPostZod),
    defaultValues: value ?? defaultValues,
  });

  const { setValue, watch, setError, clearErrors } = form;
  const router = useRouter();
  const { categorySelect } = useSnapshot(pageState, {
    sync: true,
  });

  useEffect(() => {
    getCategorys(undefined).then((res) => {
      pageState.categorySelect = res;
    });
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file === null) return;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      setValue('image', '');
      reader.onloadend = () => {
        setValue('mainImage', reader.result);
        const img = document.createElement('img');
        img.onload = () => {
          const colorThief = new (ColorThief as any)();
          const color = (colorThief as any).getColor(img);
          setValue('mainImagebgColor', rgbToHex(color[0], color[1], color[2]));
        };
        img.src = reader.result?.toString() ?? '';
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof BlogPostZod>) {
    setCreateButon('Loading');
    const { image, ...rest } = values;
    submitData(rest);
    return;
  }

  type PostCreateState = 'error' | 'sucess' | 'database error';
  const { mutate: submitData } = useMutation({
    mutationFn: (data: any) => createBlogPost(data),
    onSuccess(data: PostCreateState) {
      if (data === 'sucess') {
        setCreateButon('Success');
        setTimeout(() => {
          router.back();
          setCreateButon('Normal');
        }, 1000);
        return;
      }
      setCreateButon('Error');
    },
    onError(error) {
      setCreateButon('Error');
    },
  });
  const slug = watch('slug');
  const id = watch('id');
  const mainImage = watch('mainImage');
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['slugQuery', slug],
    queryFn: () => getBlogPostsCountQuery({ slug: slug, id: id }),
  });
  useEffect(() => {
    if (data && data.length > 0) {
      setError('slug', { message: 'Slug already exist' });
    } else {
      clearErrors('slug');
    }
  }, [data]);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mb-4 flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create Article
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Easy to use with highly integrated editing features.{' '}
          <br className="hidden sm:inline" />
          {/* <p className="text-sm text-red-500"></p> */}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {/** submit */}
          <div className=" mb-2 flex justify-end gap-2 md:flex-1">
            <SubmitButton buttonState={createButon} type="submit">
              Submit
            </SubmitButton>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title name" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Listbox {...field}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {categorySelect.find((x) => x.id === field.value)
                            ?.name ?? 'Please select'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronsUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {categorySelect.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-lime-500 text-lime-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={person.id}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
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
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter slug"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const slugData = e.target.value;
                      setValue('slug', slugData);
                      //  check slug is exist for database
                      queryClient.invalidateQueries({
                        queryKey: ['slugQuery', slugData],
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter slug"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>mainImage</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    value={field.value}
                    ref={field.ref}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </FormControl>
                <FormDescription>
                  <Image
                    width={200}
                    height={200}
                    className="rounded-lg"
                    src={
                      mainImage && mainImage != '' ? mainImage : portraitImage
                    }
                    alt="preview"
                    sizes="(max-width: 100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ReadingTime</FormLabel>
                <FormControl>
                  <Input
                    step="1"
                    type="number"
                    min={1}
                    placeholder="Enter readingTime"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <PlateEditor
                    onChange={(value) => (field.value = value)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
