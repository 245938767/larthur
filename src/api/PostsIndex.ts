import { BlockContent } from '@prisma/client';
import { produce } from 'immer';
import { z } from 'zod';

export const PostFormSchema = z.object({
  id: z.number().optional(),
  title: z.coerce.string({ required_error: 'Title is required' }).min(3).trim(),
  slug: z.coerce.string({ required_error: 'Slug is required' }).min(3).trim(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2)
    .trim(),
  body: z.any({ required_error: 'Body is required' }),
  mainImage: z.any({ required_error: 'Main image is required' }),
  mainImageUrl: z.string().optional(),
  mainImagebgColor: z.string().optional(),
  mainImagefgColor: z.string().optional(),
  categoryId: z.number().min(1, { message: 'Category is required' }),
  readingTime: z.coerce
    .number()
    .min(0, { message: 'Reading time is required' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
  published: z.boolean().optional(),
});

export const PostsSchemaConvertToDatabase = (
  schema: z.infer<typeof PostFormSchema>
) =>
  produce(schema, (draft) => {
    if (Array.isArray(draft.body)) {
      draft.body = Buffer.from(JSON.stringify(schema.body));
    }
    draft.mainImage = Buffer.from(schema.mainImage);
  });
export const DatabaseConvertToPostsSchema = (schema: BlockContent) =>
  produce(schema, (draft) => {
    draft.body = JSON.parse(schema.body?.toString('utf-8') ?? '[]');
    draft.mainImage = (schema.mainImage?.toString('utf-8') ?? undefined) as any;
    draft.mainImageUrl = schema.mainImageUrl ?? '';
  });
