import React, { useCallback } from 'react';
import WorkflowCanvas from './WorkflowCanvas';
import useWorkflowData from '../hooks/useWorkflowData';

const WorkflowManager: React.FC = () => {
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
  } = useWorkflowData();

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      const position = (event.target as HTMLElement).getBoundingClientRect();
      addNode(event.clientX - position.left, event.clientY - position.top);
    },
    [addNode]
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <WorkflowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        editingNodeId={editingNodeId}
        onStartEdit={onStartEdit}
        onSaveEdit={onSaveEdit}
        onPaneClick={handlePaneClick}
        onDeleteNode={deleteNode}
      />
    </div>
  );
};

export default WorkflowManager;