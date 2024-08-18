export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';
import { updateTask, deleteTask } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description } = req.body;
    const result = await updateTask(Number(id), name, description);
    return res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const result = await deleteTask(Number(id));
    return res.status(200).json(result);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
