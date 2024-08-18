import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">サイドバー</div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Link href="/" className="hover:bg-gray-700 p-2 rounded block">
                ダッシュボード
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/workflow" className="hover:bg-gray-700 p-2 rounded block">
                ワークフロー
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/settings" className="hover:bg-gray-700 p-2 rounded block">
                設定
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/tasks" className="hover:bg-gray-700 p-2 rounded block">
                業務一覧管理
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
