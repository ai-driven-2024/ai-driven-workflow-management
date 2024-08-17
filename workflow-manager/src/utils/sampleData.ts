import { Node, Edge } from 'reactflow';

export interface CustomNodeData {
  department: string;
  taskName: string;
}

export const sampleNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    data: { department: '営業部', taskName: '顧客情報入力' },
    position: { x: 0, y: 150 },
  },
  {
    id: '2',
    type: 'custom',
    data: { department: '営業部', taskName: '見積書作成' },
    position: { x: 250, y: 0 },
  },
  {
    id: '3',
    type: 'custom',
    data: { department: '技術部', taskName: '技術評価' },
    position: { x: 250, y: 300 },
  },
  {
    id: '4',
    type: 'custom',
    data: { department: '経理部', taskName: '請求書発行' },
    position: { x: 500, y: 150 },
  },
];

export const sampleEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e1-3', source: '1', target: '3', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e2-4', source: '2', target: '4', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'right', targetHandle: 'left' },
];

export const fetchNodeData = async (): Promise<{ nodes: Node<CustomNodeData>[]; edges: Edge[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nodes: sampleNodes, edges: sampleEdges });
    }, 1000);
  });
};