export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchTasks, createTask } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await fetchTasks();
    return res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    const result = await createTask(name, description);
    return res.status(201).json(result);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
