import Redis from 'ioredis';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorOutput, GetOriginalUrlOutput } from '../../typings';

const db = new Redis(process.env.REDIS_URL);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetOriginalUrlOutput | ErrorOutput>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  console.info(`Searching for URL with id [${id}]...`);

  const originalUrl = await db.hget(id as string, 'url');

  if (!originalUrl) {
    console.warn(`URL not found for id [${id}]!`);
    return res.status(404).end();
  }

  console.info('Original URL found, redirecting...');
  return res.status(200).json({ url: originalUrl });
}
