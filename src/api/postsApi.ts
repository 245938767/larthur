'use server';

import { BlockContent } from '@prisma/client';
import moment from 'moment';

import prismaClient from '@/lib/prisma';

import {
  DatabaseConvertToPostsSchema,
  PostsSchemaConvertToDatabase,
} from './PostsIndex';

type GetBlogPostsOptions = {
  limit?: number;
  offset?: number;
  forDisplay?: boolean;
  value?: BlockContent;
};
/**
 * the query list
 * @param param0
 * @returns
 */
export async function getLatestBlogPostsQuery({
  limit = 5,
  forDisplay = true,
  value,
}: GetBlogPostsOptions) {
  return await prismaClient.blockContent.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      readingTime: true,
      description: true,
      mainImagebgColor: true,
      mainImagefgColor: true,
      mainImage: true,
      mainImageUrl: true,
      createdAt: true,
      updatedAt: true,
      Category: true,
    },
    where: value,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export const getBlogPostsForSlug = async ({ slug = '' }: { slug: string }) => {
  const data = await prismaClient.blockContent.findFirst({
    include: {
      Category: true,
    },
    where: {
      slug: slug,
    },
  });
  return DatabaseConvertToPostsSchema(data as any);
};
/**
 *
 * @param param0 check slug is unique
 * @returns
 */
export const getBlogPostsCountQuery = async ({
  slug,
  id,
}: {
  slug: string;
  id?: number;
}) => {
  return await prismaClient.blockContent.findMany({
    select: {
      slug: true,
    },
    where: {
      slug: slug,
      id: {
        not: id,
      },
    },
  });
};

type PostCreateState = 'error' | 'sucess' | 'database error';
/**
 *
 * @param revState create
 * @param data
 * @returns
 */
export const createBlogPost = async (data: any): Promise<PostCreateState> => {
  try {
    const value = PostsSchemaConvertToDatabase(data);

    if (value.id) {
      await prismaClient.blockContent.update({
        where: {
          id: value.id,
        },
        data: value as BlockContent,
      });
    } else {
      await prismaClient.blockContent.create({
        data: value as BlockContent,
      });
    }
    return 'sucess';
  } catch (error) {
    return 'error';
  }
};

export const updateBlogPost = async (data: any) => {
  return await prismaClient.blockContent.update({
    data,
    where: {
      slug: data.slug,
      id: data.id,
    },
  });
};

export const getPostCurrentTotalNum = async () => {
  const startOfMonth = new Date(
    moment().clone().startOf('month').format('YYYY-MM-DD hh:mm:ss')
  );
  const endOfMonth = new Date(
    moment().clone().endOf('month').format('YYYY-MM-DD hh:mm:ss')
  );
  const currentMonthCount = await prismaClient.blockContent.count({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  const lastMonthCount = await prismaClient.blockContent.count({
    where: {
      createdAt: {
        gte: new Date(
          moment()
            .clone()
            .subtract(1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD hh:mm:ss')
        ),
        lte: new Date(
          moment()
            .clone()
            .subtract(1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD hh:mm:ss')
        ),
      },
    },
  });
  return {
    currentMonthCount,
    lastMonthCount,
  };
};
