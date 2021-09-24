import { randomBytes } from 'crypto';
import Redis from 'ioredis';

import type { NextApiRequest, NextApiResponse } from 'next';

const db = new Redis(process.env.REDIS_URL);
const exp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

const shorten = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || url === '' || !exp.test(url)) {
    return res.status(400).json({ message: 'Please provide a valid URL!' });
  }

  const id = randomBytes(8).toString('hex');
  console.info(`Inserting new URL with id [${id}] on database...`);

  await db.set(id, url);
  console.info('URL successfully inserted on database!');

  return res.status(201).json({ shorterUrl: `${process.env.REDIRECT_BASE_URL}/${id}` });
};

export default shorten;
