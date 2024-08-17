import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    // システムのルート証明書を使用
    rejectUnauthorized: true,
  },
};

export async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

export async function fetchWorkflowData() {
  const connection = await getConnection();
  try {
    const [nodes] = await connection.query('SELECT * FROM nodes');
    const [edges] = await connection.query('SELECT * FROM edges');
    return { nodes, edges };
  } finally {
    await connection.end();
  }
}