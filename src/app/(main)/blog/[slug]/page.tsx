import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostsForSlug } from '@/api/postsApi';

import { BlogPostPage } from '../BlogPostPage';
import { env } from 'process';
import redis from '@/lib/redis';
import { kvKeys } from '@/config/kv';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getBlogPostsForSlug({ slug: params.slug });
  if (!post) {
    notFound();
  }

  const { title, description, mainImage } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: '@thecalicastle',
      creator: '@thecalicastle',
    },
  } satisfies Metadata;
};

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostsForSlug({ slug: params.slug });
  if (!post) {
    notFound();
  }

  let views: number;
  if (env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.postViews(post.id.toString()));
  } else {
    views = 30578;
  }

  let reactions: number[] = [];

  let relatedViews: number[] = [];
  return (
    <BlogPostPage
      post={post}
      body={JSON.parse(post.body.toString('utf-8'))}
      mainImage={post.mainImage.toString('utf-8')}
      views={views}
      relatedViews={relatedViews}
      reactions={reactions.length > 0 ? reactions : undefined}
    />
  );
}
