import React from 'react';
import Layout from '../components/Layout';
import TaskTable from '../components/TaskTable';

const TasksPage: React.FC = () => {
  return (
    <Layout>
      <div className="text-2xl font-bold mb-4 text-black">業務一覧管理</div>
      <TaskTable />
    </Layout>
  );
};

export default TasksPage;
