import { getLatestBlogPostsQuery } from '@/api/postsApi';

import { kvKeys } from '@/config/kv';
import redis from '@/lib/redis';

import { BlogPostCard } from './BlogPostCard';

export async function BlogPosts({ limit = 5 }) {
  const posts = await getLatestBlogPostsQuery({ limit, forDisplay: true });
  const postIdKeys = posts.map(({ id }) => kvKeys.postViews(id.toString()));
  let views: number[] = [];
  if (process.env.VERCEL_ENV === 'development') {
    views = posts.map(() => Math.floor(Math.random() * 1000));
  } else {
    views = (await redis.mget(...postIdKeys)).map((x) => Number(x));
  }
    return (
    <>
      {posts.map((post: any, idx: number) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post.id} />
      ))}
    </>
  );
}
