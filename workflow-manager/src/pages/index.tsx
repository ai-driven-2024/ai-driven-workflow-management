import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from '@/components/Layout';
import HowtoUse from '@/components/HowtoUse'; 

const WorkflowManager = dynamic(() => import('@/components/WorkflowManager'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow Manager</title>
        <meta name="description" content="Manage your business workflows efficiently" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>  {/* Layoutコンポーネントでページ全体をラップ */}
        <main className="flex-1 p-4">
          <h1 className="text-4xl font-bold mb-8">業務フロー管理</h1>
          <div className="w-full h-[80vh]">
          <HowtoUse />
          </div>
        </main>
      </Layout>
    </>
  );
}
