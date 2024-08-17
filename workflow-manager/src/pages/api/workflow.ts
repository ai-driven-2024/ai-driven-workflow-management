import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWorkflowData } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await fetchWorkflowData();
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