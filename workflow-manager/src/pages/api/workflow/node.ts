export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, position_x, position_y, department, task_name, task_id } = req.body;

      const connection = await getConnection();
      try {
        // 新しいIDを生成するためのクエリを実行
        // const [idResult] = await connection.query('SELECT MAX(id) as maxId FROM nodes');
        const newId = crypto.randomUUID();

        const [result] = await connection.execute(
          'INSERT INTO nodes (id, type, position_x, position_y, department, task_name, task_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [newId, type, position_x, position_y, department, task_name, task_id]
        );

        const newNode = {
          id: newId,
          type,
          position_x,
          position_y,
          department,
          task_name,
          task_id,
        };

        res.status(201).json(newNode);
      } finally {
        await connection.end();
      }
    } catch (error) {
      console.error('Error adding new node:', error);
      res.status(500).json({ error: 'Failed to create new node' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}