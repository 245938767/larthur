'use client';

import React from 'react';
import Image from 'next/image';
import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  PencilSwooshIcon,
  ScriptIcon,
  UTurnLeftIcon,
} from '@/assets';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { motion } from 'framer-motion';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Balancer from 'react-wrap-balancer';

import { prettifyNumber } from '@/lib/math';
import { plugins } from '@/lib/plate/plate-plugins';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Editor } from '@/components/plate-ui/editor';
import { TooltipProvider } from '@/components/plate-ui/tooltip';

// import { PostPortableText } from '@/components/PostPortableText';
// import { Prose } from '@/components/Prose';

import { BlogPostCard } from './BlogPostCard';

// import { BlogPostTableOfContents } from './BlogPostTableOfContents';

export function BlogPostPage({
  post,
  body,
  mainImage,
  views,
  reactions,
  relatedViews,
}: {
  post: any;
  body: [];
  mainImage: string;
  views?: number;
  reactions?: number[];
  relatedViews: number[];
}) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="w-full md:flex md:justify-between xl:relative">
        <aside className="hidden w-[160px] shrink-0 lg:block">
          <div className="sticky top-2 pt-20">
            {/* <BlogPostTableOfContents headings={post.headings} /> */}
          </div>
        </aside>
        <div className="max-w-2xl md:flex-1 md:shrink-0">
          <Button
            href="/blog"
            variant="secondary"
            aria-label="返回博客页面"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
          >
            <UTurnLeftIcon className="h-8 w-8 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Button>
          <article data-postid={post.id}>
            <header className="relative flex flex-col items-center pb-5 after:absolute after:-bottom-1 after:block after:h-px after:w-full after:rounded after:bg-gradient-to-r after:from-zinc-400/20 after:via-zinc-200/10 after:to-transparent dark:after:from-zinc-600/20 dark:after:via-zinc-700/10">
              <motion.div
                className="relative mb-7 aspect-[240/135] w-full md:mb-12 md:w-[120%]"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                }}
              >
                <div className="absolute z-0 hidden aspect-[240/135] w-full blur-xl saturate-150 after:absolute after:inset-0 after:hidden after:bg-white/50 md:block md:after:block dark:after:bg-black/50">
                  <Image
                    src={mainImage}
                    alt=""
                    className="select-none"
                    unoptimized
                    fill
                    aria-hidden={true}
                  />
                </div>
                <Image
                  src={mainImage}
                  alt={post.title}
                  className="select-none rounded-2xl ring-1 ring-zinc-900/5 transition md:rounded-3xl dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
                  placeholder="blur"
                  blurDataURL={mainImage}
                  unoptimized
                  fill
                />
              </motion.div>
              <motion.div
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-600/80 dark:text-zinc-400/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <time
                  dateTime={post.createAt}
                  className="flex items-center space-x-1.5"
                >
                  <CalendarIcon />
                  <span>{moment(post.createdAt).format('YYYY-MM-DD')}</span>
                </time>
                <span className="inline-flex items-center space-x-1.5">
                  <ScriptIcon />
                  {/* <span>{post.categories.join(', ')}</span> */}
                </span>
              </motion.div>
              <motion.h1
                className="mt-6 w-full text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <Balancer>{post.title}</Balancer>
              </motion.h1>
              <motion.p
                className="my-5 w-full text-sm font-medium text-zinc-500"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.23,
                }}
              >
                {post.description}
              </motion.p>
              <motion.div
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.255,
                }}
              >
                <span
                  className="inline-flex items-center space-x-1.5"
                  title={views?.toString()}
                >
                  <CursorClickIcon />
                  <span>{prettifyNumber(views ?? 0, true)}次点击</span>
                </span>

                <span className="inline-flex items-center space-x-1.5">
                  <HourglassIcon />
                  <span>{post.readingTime.toFixed(0)}分钟阅读</span>
                </span>
              </motion.div>
            </header>
            {/* <Prose className="mt-8">
              <PostPortableText value={post.body} />
            </Prose> */}

            <TooltipProvider
              disableHoverableContent
              delayDuration={500}
              skipDelayDuration={0}
            >
              <DndProvider backend={HTML5Backend}>
                {' '}
                <CommentsProvider users={undefined} myUserId={'1'}>
                  <Plate plugins={plugins} initialValue={body} readOnly>
                    <Editor
                      className="py-16"
                      autoFocus
                      focusRing={false}
                      variant="ghost"
                      size="md"
                    />
                  </Plate>
                </CommentsProvider>
              </DndProvider>
            </TooltipProvider>
          </article>
        </div>
        <aside className="hidden w-[90px] shrink-0 lg:block">
          <div className="sticky top-2 flex justify-end pt-20">
            {/* <BlogReactions
              _id={post.id}
              mood={post.mood}
              reactions={reactions}
            /> */}
          </div>
        </aside>
      </div>

      {post.related && post.related.length > 0 ? (
        <section className="mb-12 mt-32">
          <h2 className="mb-6 flex items-center justify-center text-lg font-bold text-zinc-900 dark:text-zinc-100">
            <PencilSwooshIcon className="h-5 w-5 flex-none" />
            <span className="ml-2">相关文章</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 justify-center gap-6 md:grid-cols-[repeat(auto-fit,75%)] lg:grid-cols-[repeat(auto-fit,84%)] lg:gap-8">
            {post.related.map((post: any, idx: number) => (
              <BlogPostCard
                post={post}
                views={relatedViews[idx] ?? 0}
                key={post.id}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* <ClientOnly></ClientOnly> */}
    </Container>
  );
}