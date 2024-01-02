 'use server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const BlogPostFormSchema = z.object({
  id: z.number(),
  title: z.string({ invalid_type_error: 'Title is required' }),
  slug: z.string({ invalid_type_error: 'Slug is required' }),
  description: z.string({ invalid_type_error: 'Description is required' }),
  body: z.any({ invalid_type_error: 'Body is required' }),
  mainImage: z.any({ invalid_type_error: 'Main image is required' }),
  readingTime: z.coerce.number().gt(0, { message: 'Reading time is required' }),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
  published: z.boolean(),
});
const createBlogPostOmit = BlogPostFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
  published: true,
});
export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    body?: string[];
    mainImage?: string[];
    readingTime?: string[];
  };
  message?: string | null;
};
type GetBlogPostsOptions = {
  limit?: number;
  offset?: number;
  forDisplay?: boolean;
};
export const getLatestBlogPostsQuery = async ({
  limit = 5,
  forDisplay = true,
}: GetBlogPostsOptions) => {
  return await prisma.blockContent.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
};
export const getBlogPostsCountQuery = async ({ slug }: { slug: string }) => {
  return await prisma.blockContent.findMany({
    where: {
      slug: slug,
    },
  });
};

export const createBlogPost = async (revState: State, data: any) => {
  const validResult = createBlogPostOmit.safeParse({
    title: data.title,
    slug: data.slug,
    description: data.description,
    body: data.body,
    mainImage: data.mainImage,
    readingTime: data.readingTime,
  });
  if (!validResult.success) {
    return {
      errors: validResult.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }
  console.log('validSuccess');
  console.log(validResult.data);
  const validData = validResult.data; // 数据验证成功后的对象
  if (Array.isArray(validData.body)) {
    validData.body = Buffer.from(JSON.stringify(validData.body));
  }
  validData.mainImage = Buffer.from(validData.mainImage);
  console.log(validData);
  try {
    return await prisma.blockContent.create({
      data: validData as Prisma.BlockContentCreateInput,
    });
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }
};

export const updateBlogPost = async (data: Prisma.BlockContentUpdateInput) => {
  return await prisma.blockContent.update({
    data,
    where: {
      slug: '',
    },
  });
};
