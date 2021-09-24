import { randomBytes } from 'crypto';
import Redis from 'ioredis';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorOutput, ShortenUrlInput, ShortenUrlOutput } from '../../typings';

const db = new Redis(process.env.REDIS_URL);
const exp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

const shorten = async (
  req: NextApiRequest,
  res: NextApiResponse<ShortenUrlOutput | ErrorOutput>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url }: ShortenUrlInput = req.body;
  const ip = req.headers['x-real-ip'] || '';

  if (!url.match(exp)) {
    return res.status(400).json({ error: 'Please provide a valid URL!' });
  }

  const id = randomBytes(4).toString('hex');
  console.info(`Inserting new URL with id [${id}] on database...`);

  const hashFields = new Map();
  hashFields.set('url', url);
  hashFields.set('ip', ip);
  hashFields.set('createdAt', new Date().toISOString());

  await db.hset(id, hashFields);
  console.info('URL successfully inserted on database!');

  return res.status(201).json({ shorterUrl: `${process.env.REDIRECT_BASE_URL}/${id}` });
};

export default shorten;
