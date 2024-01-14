'use server';

import { Category } from '@prisma/client';

import prismaClient from '@/lib/prisma';

export interface CategoryWithCount extends Category {
  blogContentCount: number;
}

export async function getCategoryAllMany(): Promise<CategoryWithCount[]> {
  const categoriesWithCount = await prismaClient.category.findMany({
    include: {
      blogContent: {
        select: {
          id: true,
        },
      },
    },
  });
  const result: CategoryWithCount[] = categoriesWithCount.map((category) => {
    return {
      ...category,
      blogContentCount: category.blogContent.length,
    };
  });
  return result;
}
export async function getCategorys(): Promise<Category[]> {
  return await prismaClient.category.findMany();
}
/**
 * get category
 * @param id
 * @returns
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  return await prismaClient.category.findUnique({
    where: {
      id: id,
    },
  });
}
/**
 * create category
 * @param param0
 * @returns
 */
export async function createCategory({
  name,
  type,
  slug,
}: {
  name: string;
  type: string;
  slug: string;
}): Promise<'sucess' | 'name already exist' | 'create error'> {
  const exist = await prismaClient.category.count({
    where: { name: name },
  });
  if (exist > 0) {
    return 'name already exist';
  }
  const create = await prismaClient.category.create({
    data: {
      name: name,
      slug: slug,
      type: type,
    },
  });
  if (create == null) return 'create error';
  return 'sucess';
}
export async function deleteCategory({ id }: { id: number }) {
  return await prismaClient.category.delete({
    where: {
      id: id,
      blogContent:{
        none: {}
      }
    },
  });
}
