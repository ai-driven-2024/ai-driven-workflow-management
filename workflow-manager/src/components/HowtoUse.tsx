import React from 'react';

const Home: React.FC = () => {
  // このコンポーネントで業務を表形式や一覧形式で表示します
  return (

      <main className="flex-1 p-4">
        <h1 className="text-4xl font-bold mb-8">業務一覧</h1>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">業務ID</th>
              <th className="border px-4 py-2">業務名</th>
              <th className="border px-4 py-2">部署</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {/* データをマッピングして行を生成 */}
            {/* ここで業務データをmapして行を生成します */}
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">業務フロー設計</td>
              <td className="border px-4 py-2">IT部門</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">編集</button>
              </td>
            </tr>
            {/* 他の業務データをここに追加 */}
          </tbody>
        </table>
      </main>
  );
};

export default Home;
