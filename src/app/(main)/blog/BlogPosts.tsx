import { getLatestBlogPostsQuery } from '../../(dashboard)/dashboard/create/queries';
import { BlogPostCard } from './BlogPostCard';

export async function BlogPosts({ limit = 5 }) {
  const posts = await getLatestBlogPostsQuery({ limit, forDisplay: true });

  let views: number[] = [];
  if (process.env.VERCEL_ENV === 'development') {
    views = posts.map(() => Math.floor(Math.random() * 1000));
  } else {
  }
  return (
    <>
      {posts.map((post: any, idx: number) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post.id} />
      ))}
    </>
  );
}
