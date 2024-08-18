import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/utils/db';
import { ResultSetHeader } from 'mysql2'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, source, target, sourceHandle, targetHandle } = req.body;

    if (!id || !source || !target) {
      return res.status(400).json({ message: 'Invalid edge data' });
    }

    try {
      const connection = await getConnection();
      await connection.execute(
        `INSERT INTO edges (id, source, target, source_handle, target_handle, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [id, source, target, sourceHandle, targetHandle]
      );
      await connection.end();

      res.status(200).json({ message: 'Edge added successfully' });
    } catch (error) {
      console.error('Error adding edge:', error);
      res.status(500).json({ message: 'Error adding edge' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid edge ID' });
    }

    try {
      const connection = await getConnection();
      const [result] = await connection.execute<ResultSetHeader>(
        'DELETE FROM edges WHERE id = ?',
        [id]
      );
      await connection.end();

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Edge not found' });
      }

      res.status(200).json({ message: 'Edge deleted successfully' });
    } catch (error) {
      console.error('Error deleting edge:', error);
      res.status(500).json({ message: 'Error deleting edge' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
