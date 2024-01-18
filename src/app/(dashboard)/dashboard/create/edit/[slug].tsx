import { getBlogPostBySlug } from '@/api/postsApi';
import { DatabaseConvertToPostsSchema } from '@/api/PostsIndex';

import CreateArticle from '../CreateArticle';

function CreatePost({ value }: { value: any }) {
  return <CreateArticle value={value} />;
}

export async function getStaticProps({ params }: { params: any }) {
  const data = await getBlogPostBySlug(params.slug);
  if (data === null) {
    return {
      notFound: true,
    };
  }
  const value = DatabaseConvertToPostsSchema(data);
  return { props: { value } };
}

export default CreatePost;
