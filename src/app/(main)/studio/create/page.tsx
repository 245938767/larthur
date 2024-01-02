'use client';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { AnimatePresence, motion } from 'framer-motion';
import { proxy, useSnapshot } from 'valtio';

import { clsxm } from '@/lib/helper';
import { Button } from '@/components/ui/Button';
import PlateEditor from '@/components/plate-editor';

import { createBlogPost } from '../../../../../prisma/queries';

export const blogPostState = proxy<{
  title: string;
  slug: string;
  description: string;
  readingTime: number;
  mainImage: any;
  body: any;
}>({
  title: '',
  slug: '',
  description: '',
  readingTime: 0,
  mainImage: null,
  body: [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ],
});
export default function IndexPage() {
  const initialState = { message: null, errors: {} };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file === null) return;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        blogPostState.mainImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const formData = useSnapshot(blogPostState, { sync: true });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Process the Markdown content
    submitData(formData as any);
    return;
  };

  const { data: state, mutate: submitData } = useMutation({
    mutationFn: (data) => createBlogPost(initialState, data),
    mutationKey: ['data', formData],
    onSuccess(data) {
      console.log(data);
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
            Plugin system & primitive component library.{' '}
            <br className="hidden sm:inline" />
            CLI for styled components. Customizable. Open Source. And Next.js 14
            Ready.
          </p>
        </div>
        {/** submit */}
        <div className=" mb-4 flex justify-end gap-2 md:flex-1">
          <AnimatePresence>
            <motion.div
              className={clsxm(
                ' w-20 pointer-events-auto relative flex h-10 rounded-full transition-opacity duration-500 hover:opacity-100',
                'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
                'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
                'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
                '[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]'
              )}
              whileHover={{ scale: 1.2, rotate: 0 }}
              whileTap={{
                scale: 0.8,
                rotate: 0,
              }}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
            >
              <button
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
          <label htmlFor="title" className="my-2 block text-sm font-medium">
            Title
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
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
            />
          </div>
        </div>
        {/** Slug */}
        <div className="mb-4">
          <label htmlFor="slug" className="my-2 block text-sm font-medium">
            Slug
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
            />
          </div>
        </div>
        {/** description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="my-2 block text-sm font-medium"
          >
            Description
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
            />
          </div>
        </div>
        {/** image */}
        <div className="mb-4">
          <label htmlFor="mainImage" className="my-2 block text-sm font-medium">
            mainImage
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
        <div className="mb-4">
          <label className=" mt-2 block text-sm font-medium">ReadingTime</label>
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
            />
          </div>
        </div>
        <div className="mb-4">
          <label className=" mt-2 block text-sm font-medium">Body</label>

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
