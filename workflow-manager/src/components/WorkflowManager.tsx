import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import WorkflowCanvas from './WorkflowCanvas';
import useWorkflowData from '../hooks/useWorkflowData';

const WorkflowManager: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const taskId = typeof id === 'string' ? id : '';

  const {
    nodes,
    edges,
    editingNodeId,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onStartEdit,
    onSaveEdit,
    addNode,
    deleteNode,
  } = useWorkflowData(taskId);

  const handleAddNodeClick = useCallback(() => {
    // ボタンをクリックしたときに、特定の位置にノードを追加する
    // 位置は仮に (150, 150) としていますが、これは必要に応じて変更可能です
    addNode(150, 150);
  }, [addNode]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* 「新しい業務を追加」ボタン */}
      <button
        onClick={handleAddNodeClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000, // ボタンがキャンバス上に表示されるように zIndex を設定
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        新しい業務を追加
      </button>

      <WorkflowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        editingNodeId={editingNodeId}
        onStartEdit={onStartEdit}
        onSaveEdit={onSaveEdit}
        onPaneClick={() => {}} // 今回は使用しないので空の関数を渡す
        onDeleteNode={deleteNode}
      />
    </div>
  );
};

export default WorkflowManager;
