import PlateEditor from '@/components/plate-editor';

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <form>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Plate Playground.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Plugin system & primitive component library.{' '}
            <br className="hidden sm:inline" />
            CLI for styled components. Customizable. Open Source. And Next.js 14
            Ready.
          </p>
        </div>

        <button type="submit">Submit</button>
        {/** title */}
        <div className="mb-4">
          <label htmlFor="title" className="my-2 block text-sm font-medium">
            Title
          </label>
          <div className=" mt-2 rounded-md">
            <input
              id="title"
              name="title"
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
              placeholder="Enter description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className=" mt-2 block text-sm font-medium">ReadingTime</label>
          <div className=" mt-2 rounded-md">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
              id="readingTime"
              name="readingTime"
              step="1"
              type="number"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className=" mt-2 block text-sm font-medium">Body</label>

          <div className="max-w-[1336px] rounded-lg border bg-background shadow">
            <div className=" mt-2 rounded-md">
              <PlateEditor />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
