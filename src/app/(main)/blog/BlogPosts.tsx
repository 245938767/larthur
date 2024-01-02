import { kvKeys } from '@/config/kv';

import { getLatestBlogPostsQuery } from '../../../../prisma/queries';
import { BlogPostCard } from './BlogPostCard';

export async function BlogPosts({ limit = 5 }) {
  const posts = await getLatestBlogPostsQuery({ limit, forDisplay: true });
  // const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id));

  let views: number[] = [];
  if (process.env.VERCEL_ENV === 'development') {
    views = posts.map(() => Math.floor(Math.random() * 1000));
  } else {
  }
  console.log(posts);

  return (
    <>
      {posts.map((post, idx) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post.id} />
      ))}
    </>
  );
}
