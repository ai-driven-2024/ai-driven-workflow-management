import React, { useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  MiniMap,
  Background,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import createNodeTypes from './NodeTypes';

interface CustomNodeData {
  department: string;
  task_name: string;
}

interface WorkflowCanvasProps {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  editingNodeId: string | null;
  onStartEdit: (nodeId: string) => void;
  onSaveEdit: (nodeId: string, newData: CustomNodeData) => void;
  onPaneClick: (event: React.MouseEvent) => void;
  onDeleteNode: (nodeId: string) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  editingNodeId,
  onStartEdit,
  onSaveEdit,
  onPaneClick,
  onDeleteNode,
}) => {
  const nodeTypes = useMemo(
    () => createNodeTypes({ editingNodeId, onStartEdit, onSaveEdit, onDeleteNode }),
    [editingNodeId, onStartEdit, onSaveEdit, onDeleteNode]
  );

  return (
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
      <Panel position="top-right">
        <button onClick={onPaneClick} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Node
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default WorkflowCanvas;