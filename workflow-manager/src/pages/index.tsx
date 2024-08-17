import dynamic from 'next/dynamic'
import Head from 'next/head'

const WorkflowManager = dynamic(() => import('@/components/WorkflowManager'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow Manager</title>
        <meta name="description" content="Manage your business workflows efficiently" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8">Workflow Manager</h1>
        <div className="w-full h-[80vh]">
          <WorkflowManager />
        </div>
      </main>
    </>
  )
}