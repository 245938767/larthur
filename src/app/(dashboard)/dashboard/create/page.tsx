/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { useRef } from 'react';
import { ErrorIcon, RefreshIcon, SuccessIcon } from '@/assets';
import { useMutation } from '@tanstack/react-query';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import ColorThief from 'colorthief';
import { AnimatePresence, motion } from 'framer-motion';
import { proxy, useSnapshot } from 'valtio';

import { clsxm } from '@/lib/helper';
import { rgbToHex } from '@/lib/rgb';
import { Button } from '@/components/ui/Button';
import PlateEditor from '@/components/plate-editor';

import { createBlogPost } from '../../../../../prisma/queries';
import { useRouter } from 'next/navigation';

const blogPostState = proxy<{
  title: string;
  slug: string;
  description: string;
  readingTime: number;
  mainImagebgColor?: string;
  mainImagefgColor: string;
  mainImage: any;
  body: any;
}>({
  title: '',
  slug: '',
  description: '',
  readingTime: 0,
  mainImage: null,
  mainImagebgColor: undefined,
  mainImagefgColor: '#fff',
  body: [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ],
});

const pageState = proxy<{
  createButonState: boolean;
  createButon: 'Normal' | 'Loading' | 'Error' | 'Success';
}>({ createButonState: false, createButon: 'Normal' });
export default function IndexPage() {
  const router = useRouter();

  const { createButonState, createButon } = useSnapshot(pageState, {
    sync: true,
  });
  const initialState = { message: null, errors: {} };
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

  const formData = useSnapshot(blogPostState, { sync: true });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    pageState.createButonState = true;
    pageState.createButon = 'Loading';
    submitData(blogPostState as any);
    return;
  };

  const { data: state, mutateAsync: submitData } = useMutation({
    mutationFn: (data) => createBlogPost(initialState, data),
    onSuccess(data) {
      //@ts-ignore
      if (data.message === '') {
        pageState.createButonState = false;
        pageState.createButon = 'Success';
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        return;
      }
      pageState.createButonState = false;
      pageState.createButon = 'Error';
    },
    onError(error, variables, context) {
      pageState.createButonState = false;
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
          <div className="mr-5 mt-3 flex ">
            <AnimatePresence>
              {createButon === 'Loading' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="  absolute "
                >
                  <RefreshIcon className=" justify-center  align-middle dark:fill-white" />
                </motion.div>
              )}
              {createButon === 'Success' && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  className="  absolute "
                >
                  <SuccessIcon className=" justify-center  fill-green-500 align-middle" />
                </motion.div>
              )}
              {createButon === 'Error' && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  className="absolute"
                >
                  <ErrorIcon className=" justify-center  fill-red-500 align-middle" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            <motion.div
              className={clsxm(
                ' w-20 pointer-events-auto relative flex h-10 rounded-full transition-opacity duration-500 hover:opacity-100',
                'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
                'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
                'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
                '[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                rotate: 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
            >
              <button
                disabled={createButonState}
                type="submit"
                className=" bg-transparent px-4 py-2 text-sm font-medium hover:text-lime-600 dark:hover:text-lime-400"
              >
                Submit
              </button>
            </motion.div>
          </AnimatePresence>
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
            <input
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
            <input
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
            <input
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
              <input
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
            <input
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
