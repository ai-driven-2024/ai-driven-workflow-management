import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Next.jsのルーターをインポート

interface Task {
  id: number;
  name: string;
  description: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const router = useRouter(); // Next.jsのルーターを使用

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleSaveTask = async () => {
    if (editingTask) {
      await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTask),
      });
      setEditingTask(null);
    } else {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      setNewTask({ name: '', description: '' });
    }
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  // 業務からワークフローキャンバスに遷移する関数
  const handleViewFlow = (taskId: number) => {
    router.push(`/workflow/${taskId}`); // ワークフローキャンバスページに遷移
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">業務一覧</h2>
      
      {/* 新規業務作成フォーム */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="業務名" 
          value={editingTask ? editingTask.name : newTask.name}
          onChange={(e) => editingTask ? setEditingTask({ ...editingTask, name: e.target.value }) : setNewTask({ ...newTask, name: e.target.value })}
          className="border p-2 mr-2 rounded text-gray-800"
        />
        <input 
          type="text" 
          placeholder="業務説明" 
          value={editingTask ? editingTask.description : newTask.description}
          onChange={(e) => editingTask ? setEditingTask({ ...editingTask, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 mr-2 rounded text-gray-800"
        />
        <button 
          onClick={handleSaveTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? '更新' : '追加'}
        </button>
      </div>

      {/* 業務一覧テーブル */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-gray-800">ID</th>
            <th className="border px-4 py-2 text-gray-800">業務名</th>
            <th className="border px-4 py-2 text-gray-800">説明</th>
            <th className="border px-4 py-2 text-gray-800">アクション</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="border px-4 py-2 text-gray-800">{task.id}</td>
              <td className="border px-4 py-2 text-gray-800">{task.name}</td>
              <td className="border px-4 py-2 text-gray-800">{task.description}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => setEditingTask(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  編集
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  削除
                </button>
                <button 
                  onClick={() => handleViewFlow(task.id)} // 「フローを見る」ボタンを追加
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  フローを見る
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
