export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWorkflowData } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;

  if (req.method === 'GET') {
    if (!taskId || typeof taskId !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing taskId' });
    }

    try {
      const data = await fetchWorkflowData(taskId);
      
      if (!data || !data.nodes || !data.edges) {
        return res.status(404).json({ message: 'No workflow data found for the given taskId' });
      }

      res.status(200).json(data);
    } catch (error: unknown) {
      console.error('Error fetching workflow data:', error);
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching workflow data', error: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}