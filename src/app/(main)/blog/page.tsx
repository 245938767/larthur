import { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';

import { Container } from '@/components/ui/Container';

import { BlogPosts } from './BlogPosts';

const description =
  '分享自己的想法和经验，记录自己的成长。每次的文章以及经验总结都会记录在这里。感谢您的阅读如果你有什么建议和意见请发送邮箱给我。';
export const metadata = {
  title: '我的博客',
  description,
  openGraph: {
    title: '我的博客',
    description,
  },
  twitter: {
    title: '我的博客',
    description,
    card: 'summary_large_image',
  },
} satisfies Metadata;

// TODO: add pagination or infinite scroll
export default function BlogPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          欢迎光临我的博客
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
        <p className="flex items-center"></p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        <BlogPosts limit={20} />
      </div>
    </Container>
  );
}

export const revalidate = 60;
