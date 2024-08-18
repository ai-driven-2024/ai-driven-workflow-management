import mysql from 'mysql2/promise';
import fs from 'fs';

// const dbConfig = {
//   host: process.env.TIDB_HOST,
//   port: parseInt(process.env.TIDB_PORT || '4000'),
//   user: process.env.TIDB_USER,
//   password: process.env.TIDB_PASSWORD,
//   database: process.env.TIDB_DATABASE,
//   ssl: {
//     // システムのルート証明書を使用
//     rejectUnauthorized: true,
//   },
// };
const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    // `TIDB_SSL_CA`環境変数が設定されている場合、それを使用
    ca: process.env.TIDB_SSL_CA ? fs.readFileSync(process.env.TIDB_SSL_CA) : undefined,
    rejectUnauthorized: true,
  },
};

export async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

export async function fetchWorkflowData(taskId: string) {
  const connection = await getConnection();
  try {
    const [nodes] = await connection.query('SELECT * FROM nodes WHERE task_id = ?', [taskId]);
    const [edges] = await connection.query('SELECT * FROM edges WHERE source IN (SELECT id FROM nodes WHERE task_id = ?) OR target IN (SELECT id FROM nodes WHERE task_id = ?)', [taskId, taskId]);
    return { nodes, edges };
  } finally {
    await connection.end();
  }
}


// Tasksテーブルからデータを取得する関数
export async function fetchTasks() {
  const connection = await getConnection();
  try {
    const [tasks] = await connection.query('SELECT * FROM tasks');
    return tasks;
  } finally {
    await connection.end();
  }
}

// Tasksテーブルに新しいタスクを追加する関数
export async function createTask(name: string, description: string) {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO tasks (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result;
  } finally {
    await connection.end();
  }
}

// Tasksテーブルの既存のタスクを更新する関数
export async function updateTask(id: number, name: string, description: string) {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute(
      'UPDATE tasks SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description, id]
    );
    return result;
  } finally {
    await connection.end();
  }
}

// Tasksテーブルのタスクを削除する関数
export async function deleteTask(id: number) {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );
    return result;
  } finally {
    await connection.end();
  }
}
