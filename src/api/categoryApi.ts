'use server';

import { Category } from '@prisma/client';

import prismaClient from '@/lib/prisma';

export interface CategoryWithCount extends Category {
  blogContentCount: number;
}

export async function getCategoryAllMany(
  category?: Category
): Promise<CategoryWithCount[]> {
  const categoriesWithCount = await prismaClient.category.findMany({
    include: {
      blogContent: {
        select: {
          id: true,
        },
      },
    },
    where: category,
  });
  const result: CategoryWithCount[] = categoriesWithCount.map((category) => {
    return {
      ...category,
      blogContentCount: category.blogContent.length,
    };
  });
  return result;
}
export async function getCategorys(category?: Category): Promise<Category[]> {
  return await prismaClient.category.findMany({ where: category });
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
  id,
  name,
  type,
  slug,
}: {
  id?: number;
  name: string;
  type?: string;
  slug?: string;
}): Promise<'sucess' | 'name already exist' | 'create error' | 'update error'> {
  if (id) {
    const exist = await prismaClient.category.count({
      where: {
        name: name,
        id: {
          not: id,
        },
      },
    });
    if (exist > 0) {
      return 'name already exist';
    }
    const update = await prismaClient.category.update({
      where: { id: id },
      data: {
        name: name,
        slug: slug,
        type: type,
      },
    });
    if (update == null) return 'update error';
  } else {
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
  }
  return 'sucess';
}
export async function deleteCategory({ id }: { id: number }) {
  return await prismaClient.category.delete({
    where: {
      id: id,
      blogContent: {
        none: {},
      },
    },
  });
}
