export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/utils/db';
import { ResultSetHeader } from 'mysql2'; // 追加: ResultSetHeader をインポート

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { department, task_name } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid node ID' });
    }

    try {
      const connection = await getConnection();
      await connection.execute(
        'UPDATE nodes SET department = ?, task_name = ? WHERE id = ?',
        [department, task_name, id]
      );
      await connection.end();

      res.status(200).json({ message: 'Node updated successfully' });
    } catch (error) {
      console.error('Error updating node:', error);
      res.status(500).json({ message: 'Error updating node' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid node ID' });
    }

    try {
      const connection = await getConnection();
      const [result] = await connection.execute<ResultSetHeader>(
        'DELETE FROM nodes WHERE id = ?',
        [id]
      );
      await connection.end();

      if (result.affectedRows === 0) {  // ここでエラーが解消されます
        return res.status(404).json({ message: 'Node not found' });
      }

      res.status(200).json({ message: 'Node deleted successfully' });
    } catch (error) {
      console.error('Error deleting node:', error);
      res.status(500).json({ message: 'Error deleting node' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
