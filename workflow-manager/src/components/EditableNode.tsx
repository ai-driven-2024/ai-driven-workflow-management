import React, { useState } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { FaTrash } from 'react-icons/fa';

interface CustomNodeData {
  department: string;
  task_name: string;
  task_id: string;
}

export interface EditableNodeProps extends NodeProps<CustomNodeData> {
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveEdit: (id: string, newData: CustomNodeData) => void;
  onDelete: () => void;
}

const EditableNode: React.FC<EditableNodeProps> = ({
  id,
  data,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onDelete,
}) => {
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    onSaveEdit(id, editData); // 編集内容を保存
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <div
      className="relative px-4 py-2 shadow-md rounded-md bg-white border-2"
      onDoubleClick={onStartEdit} // ダブルクリックで編集モードに切り替え
    >
      <Handle type="target" position={Position.Left} />
      {isEditing ? (
        <div>
          <input
            className="font-bold text-lg text-gray-800 w-full mb-2"
            value={editData.department}
            onChange={(e) =>
              setEditData({ ...editData, department: e.target.value })
            }
          />
          <input
            className="text-sm text-gray-600 w-full"
            value={editData.task_name}
            onChange={(e) =>
              setEditData({ ...editData, task_name: e.target.value })
            }
          />
          <button
            className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <div className="font-bold text-gray-700 pr-6">
            {data.department}
          </div>
          <div className="text-sm text-gray-800 pr-6">
            {data.task_name}
          </div>
        </div>
      )}
      <button
        className="absolute top-1 right-1 p-0.5 bg-transparent text-gray-500 rounded z-10"
        onClick={handleDeleteClick}
        title="Delete Node"
      >
        <FaTrash style={{ width: 20, height: 20 }} />
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default EditableNode;
