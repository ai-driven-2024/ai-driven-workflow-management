import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from '@/components/Layout';
import TaskTable from '@/components/TaskTable';

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow Manager</title>
        <meta name="description" content="Manage your business workflows efficiently" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TaskTable />
      </Layout>
    </>
  );
}
