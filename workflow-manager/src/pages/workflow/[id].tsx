import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

const WorkflowManager = dynamic(() => import('../../components/WorkflowManager'), { ssr: false });

const WorkflowPage: React.FC = () => {
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (typeof id === 'string') {
        setTaskId(id);
      } else if (Array.isArray(id)) {
        setTaskId(id[0]);
      } else {
        // Handle the case where id is undefined or not in the expected format
        console.error('Invalid task ID');
        // You might want to redirect to an error page or show an error message
      }
    }
  }, [router.isReady, router.query]);

  if (!taskId) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="w-full h-screen p-4 bg-gray-100">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">業務ID: {taskId} のワークフロー</h1>
      <div className="w-full h-full bg-white shadow-lg rounded-lg">
        <WorkflowManager />
      </div>
    </div>
    </Layout>
  );
};

export default WorkflowPage;