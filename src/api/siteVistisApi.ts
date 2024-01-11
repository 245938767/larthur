'use server';

import { NextApiRequest, NextApiResponse } from 'next';

import prismaClient from '@/lib/prisma';

export default async function getCurrentMonthReadCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prismaClient.siteVistis.findFirst();
  return res.json(result);
}
