import React from 'react';
import Layout from '@/components/Layout';

const Settings: React.FC = () => {
  return (
    <Layout>
      <main className="flex-1 p-4 text-black"> {/* テキストカラーを黒に設定 */}
        <h1 className="text-4xl font-bold mb-8">設定</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">ユーザー設定</h2>
          <div className="bg-white p-4 shadow rounded">
            <label className="block mb-2 font-medium">ユーザー名</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ユーザー名を入力"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">通知設定</h2>
          <div className="bg-white p-4 shadow rounded">
            <label className="block mb-2 font-medium">通知を受け取る</label>
            <input type="checkbox" className="mr-2" />
            <span>有効にする</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">テーマ設定</h2>
          <div className="bg-white p-4 shadow rounded">
            <label className="block mb-2 font-medium">テーマ</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="light">ライト</option>
              <option value="dark">ダーク</option>
            </select>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Settings;
