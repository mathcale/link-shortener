import Redis from 'ioredis';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorOutput } from '../../../typings';

const db = new Redis(process.env.REDIS_URL);

const redirect = async (req: NextApiRequest, res: NextApiResponse<void | ErrorOutput>) => {
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
  return res.redirect(originalUrl);
};

export default redirect;
