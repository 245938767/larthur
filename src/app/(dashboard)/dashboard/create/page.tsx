/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { Fragment, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCategorys } from '@/api/categoryApi';
import { createBlogPost } from '@/api/postsApi';
import { Listbox, Transition } from '@headlessui/react';
import { Category } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import ColorThief from 'colorthief';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { proxy, useSnapshot } from 'valtio';

import { rgbToHex } from '@/lib/rgb';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';
import PlateEditor from '@/components/plate-editor';

const blogInitialState = {
  title: '',
  slug: '',
  description: '',
  readingTime: 0,
  mainImage: null,
  mainImagebgColor: undefined,
  mainImagefgColor: '#fff',
  categoryId: undefined,
  body: [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ],
};
const pageInitialState = {
  createButon: 'Normal',
  categorySelect: [],
  select: undefined,
};

const blogPostState = proxy<{
  title: string;
  slug: string;
  description: string;
  readingTime: number;
  mainImagebgColor?: string;
  categoryId?: number;
  mainImagefgColor: string;
  mainImage: any;
  body: any;
}>(blogInitialState);

const pageState = proxy<{
  createButon: 'Normal' | 'Loading' | 'Error' | 'Success';
  categorySelect: Category[];
  select?: Category;
}>({
  createButon: 'Normal',
  categorySelect: [],
  select: undefined,
});
export default function IndexPage() {
  const router = useRouter();
  const { select, categorySelect, createButon } = useSnapshot(pageState, {
    sync: true,
  });

  useEffect(() => {
    getCategorys().then((res) => {
      pageState.categorySelect = res;
    });
  }, []);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    //@ts-ignore
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file === null) return;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        blogPostState.mainImage = reader.result;
        const img = document.createElement('img');
        img.onload = () => {
          const colorThief = new (ColorThief as any)();
          const color = (colorThief as any).getColor(img);
          blogPostState.mainImagebgColor = rgbToHex(
            color[0],
            color[1],
            color[2]
          );
        };
        img.src = reader.result?.toString() ?? '';
      };
      reader.readAsDataURL(file);
    }
  };

  // submit
  const formData = useSnapshot(blogPostState, { sync: true });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    pageState.createButon = 'Loading';
    submitData(blogPostState as any);
    return;
  };

  const { data: state, mutateAsync: submitData } = useMutation({
    mutationFn: createBlogPost,
    onSuccess(data: any) {
      //@ts-ignore
      if (data.message === '') {
        pageState.createButon = 'Success';
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        return;
      }
      pageState.createButon = 'Error';
    },
    onError() {
      pageState.createButon = 'Error';
    },
  });
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Create Article
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Easy to use with highly integrated editing features.{' '}
            <br className="hidden sm:inline" />
            {state?.message && (
              <p className="text-sm text-red-500">{state?.message}</p>
            )}
          </p>
        </div>
        {/** submit */}
        <div className=" mb-4 flex justify-end gap-2 md:flex-1">
          <SubmitButton buttonState={createButon} type="submit">
            Submit
          </SubmitButton>
        </div>
        {/** title */}
        <div className="mb-4">
          <label htmlFor="title" className="my-2 flex text-sm font-medium">
            Title
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.title &&
                  //@ts-ignore
                  state.errors.title.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className=" mt-2 rounded-md">
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => {
                blogPostState.title = e.target.value;
              }}
              placeholder="Enter title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
              aria-description="title-error"
            />
          </div>
        </div>
        {/** Category */}
        <div className="mb-4">
          <label className="my-2 flex text-sm font-medium">
            Category
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.categoryId &&
                  //@ts-ignore
                  state.errors.categoryId.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className=" mt-2 rounded-md">
            <Listbox
              value={select}
              onChange={(select) => {
                pageState.select = select;
                blogPostState.categoryId = select.id;
              }}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {select?.name ?? 'Please select'}
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
                        value={person}
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
          </div>
        </div>
        {/** Slug */}
        <div className="mb-4">
          <label htmlFor="slug" className="my-2 flex text-sm font-medium">
            Slug
            <div id="slug-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.slug &&
                  //@ts-ignore
                  state.errors.slug.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className=" mt-2 rounded-md">
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={(e) => {
                blogPostState.slug = e.target.value;
              }}
              placeholder="Enter slug"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
              aria-description="slug-error"
            />
          </div>
        </div>
        {/** description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="my-2 flex text-sm font-medium"
          >
            Description
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.description &&
                  //@ts-ignore
                  state.errors.description.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className=" mt-2 rounded-md">
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => {
                blogPostState.description = e.target.value;
              }}
              placeholder="Enter description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
              aria-description="description-error"
            />
          </div>
        </div>
        {/** image */}
        <div className="mb-4">
          <label htmlFor="mainImage" className="my-2 flex text-sm font-medium">
            mainImage
            <div id="mainImage-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.mainImage &&
                  //@ts-ignore
                  state.errors.mainImage.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className="mt-2 flex rounded-md">
            <div>
              <Input
                id="mainImage"
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
                aria-description="mainImage-error"
              />
              <Button type="button" onClick={handleUploadClick}>
                Upload image
              </Button>
              {formData.mainImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="rounded-lg"
                  src={formData.mainImage}
                  alt="preview"
                  style={{ maxWidth: '300px', marginTop: '10px' }}
                />
              )}
            </div>
          </div>
        </div>
        {/** readingTime */}
        <div className="mb-4">
          <label className=" mt-2 flex text-sm font-medium">
            ReadingTime
            <div id="readingTime-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.readingTime &&
                  //@ts-ignore
                  state.errors.readingTime.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>
          <div className=" mt-2 rounded-md">
            <Input
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
              id="readingTime"
              name="readingTime"
              value={formData.readingTime}
              onChange={(e) => {
                blogPostState.readingTime = Number(e.target.value);
              }}
              step="1"
              type="number"
              aria-description="readingTime-error"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className=" mt-2 block text-sm font-medium">
            Body
            <div id="body-error" aria-live="polite" aria-atomic="true">
              {
                //@ts-ignore
                state?.errors?.body &&
                  //@ts-ignore
                  state.errors.body.map((error: string) => (
                    <p className="ml-5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))
              }
            </div>
          </label>

          <div className="max-w-[1336px] rounded-lg border bg-background shadow">
            <div className=" mt-2 rounded-md">
              <PlateEditor
                onChange={(value) => (blogPostState.body = value)}
                value={formData.body}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
