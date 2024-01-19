import { getBlogPostsForSlug } from '@/api/postsApi';

import NotFound from '@/app/not-found';

import CreateArticle from '../CreateArticle';

async function CreatePost({ params }: { params: { slug: string } }) {
  const data = await getBlogPostsForSlug({ slug: params.slug });
  if (data === null) {
    return <NotFound />;
  }
  return <CreateArticle value={{ image: '', ...data }} />;
}

export default CreatePost;
