import React, { useState, useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

interface CustomNodeData {
  department: string;
  task_name: string;
}

export interface EditableNodeProps extends NodeProps<CustomNodeData> {
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveEdit: (id: string, newData: CustomNodeData) => void;
  onDelete: () => void;
}

const EditableNode: React.FC<EditableNodeProps> = ({ data, id, isEditing, onStartEdit, onSaveEdit, onDelete }) => {
  const [editedData, setEditedData] = useState(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleSave = () => {
    onSaveEdit(id, editedData);
  };

  if (isEditing) {
    return (
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
        <Handle type="target" position={Position.Left} />
        <input
          className="font-bold text-lg text-gray-800 w-full mb-2"
          value={editedData.department}
          onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
        />
        <input
          className="text-sm text-gray-600 w-full"
          value={editedData.task_name}
          onChange={(e) => setEditedData({ ...editedData, task_name: e.target.value })}
        />
        <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>
          Save
        </button>
        <Handle type="source" position={Position.Right} />
      </div>
    );
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-300" onDoubleClick={onStartEdit}>
      <Handle type="target" position={Position.Left} />
      <div className="font-bold text-gray-700">{data.department}</div>
      <div className="text-sm text-gray-800">{data.task_name}</div>
      <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded" onClick={onDelete}>
        Delete
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default EditableNode;