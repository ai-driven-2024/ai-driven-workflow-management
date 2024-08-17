import React from 'react';
import { NodeProps, NodeTypes as ReactFlowNodeTypes } from 'reactflow';
import EditableNode from './EditableNode';

interface CustomNodeData {
  department: string;
  task_name: string;
}

interface NodeTypesProps {
  editingNodeId: string | null;
  onStartEdit: (nodeId: string) => void;
  onSaveEdit: (nodeId: string, newData: CustomNodeData) => void;
  onDeleteNode: (nodeId: string) => void;
}

const createNodeTypes = ({ editingNodeId, onStartEdit, onSaveEdit, onDeleteNode }: NodeTypesProps): ReactFlowNodeTypes => {
  const CustomNode = (nodeProps: NodeProps<CustomNodeData>) => (
    <EditableNode
      {...nodeProps}
      isEditing={nodeProps.id === editingNodeId}
      onStartEdit={() => onStartEdit(nodeProps.id)}
      onSaveEdit={onSaveEdit}
      onDelete={() => onDeleteNode(nodeProps.id)}
    />
  );

  return { custom: CustomNode };
};

export default createNodeTypes;