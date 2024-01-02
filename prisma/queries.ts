'use server';

import { Prisma } from '@prisma/client';
// import { ColorThief } from 'colorthief';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const BlogPostFormSchema = z.object({
  id: z.number(),
  title: z.coerce.string({ required_error: 'Title is required' }).min(3),
  slug: z.coerce.string({ required_error: 'Slug is required' }).min(3),
  description: z.string({ required_error: 'Description is required' }).min(2),
  body: z.any({ required_error: 'Body is required' }),
  mainImage: z.any({ required_error: 'Main image is required' }),
  mainImagebgColor: z.string().optional(),
  mainImagefgColor: z.string().optional(),
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
    select: {
      id: true,
      title: true,
      slug: true,
      readingTime: true,
      mainImage: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
    // where:{
    //   published:true
    // },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
};
/**
 *
 * @param param0 check slug is unique
 * @returns
 */
export const getBlogPostsCountQuery = async ({ slug }: { slug: string }) => {
  return await prisma.blockContent.findMany({
    select: {
      slug: true,
    },
    where: {
      slug: slug,
    },
  });
};

/**
 *
 * @param revState create
 * @param data
 * @returns
 */
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
  const validData = validResult.data;

  if (!validData.mainImage) {
    return {
      errors: {
        mainImage: ['Main image is required'],
      },
    };
  }
  // normal fg color
  validData.mainImagefgColor = '#fff';
  // set bg color
  // const colorThief = new ColorThief();
  // validData.mainImagebgColor = colorThief.getColor(validData.mainImage);
  // console.log(validData.mainImagebgColor);
  // check the slug is unique
  const slugCheck = await getBlogPostsCountQuery({ slug: validData.slug });
  if (slugCheck.length > 0) {
    return {
      errors: {
        slug: ['The slug already exists'],
      },
    };
  }

  try {
    if (Array.isArray(validData.body)) {
      validData.body = Buffer.from(JSON.stringify(validData.body));
    }
    validData.mainImage = Buffer.from(validData.mainImage);
    return await prisma.blockContent.create({
      data: validData as Prisma.BlockContentCreateInput,
    });
  } catch (error) {
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
