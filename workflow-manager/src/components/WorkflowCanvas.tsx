import React, { useState, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  MiniMap,
  Background,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import EditableNode from './EditableNode'; // EditableNodeをインポート

interface CustomNodeData {
  department: string;
  task_name: string;
  task_id: string;
}

interface WorkflowCanvasProps {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  onPaneClick: (event: React.MouseEvent) => void;
  editingNodeId: string | null; // これを追加
  onStartEdit: (nodeId: string) => void;
  onSaveEdit: (nodeId: string, newData: CustomNodeData) => void;
  onDeleteNode: (nodeId: string) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onPaneClick,
  editingNodeId,
  onStartEdit,
  onSaveEdit,
  onDeleteNode,
}) => {
  const nodeTypes = useMemo(() => ({
    custom: (nodeProps: NodeProps<CustomNodeData>) => (
      <EditableNode
        {...nodeProps}
        isEditing={nodeProps.id === editingNodeId}
        onStartEdit={() => onStartEdit(nodeProps.id)}
        onSaveEdit={onSaveEdit}
        onDelete={() => onDeleteNode(nodeProps.id)}
      />
    )
  }), [editingNodeId]);

  return (
    <div style={{ width: '100%', height: '80vh', border: '1px solid #ddd' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;