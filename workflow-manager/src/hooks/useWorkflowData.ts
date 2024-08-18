// import { useState, useEffect, useCallback, useRef } from 'react';
// import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, Connection, addEdge } from 'reactflow';

// interface CustomNodeData {
//   department: string;
//   task_name: string;
//   task_id: string;
// }

// interface HistoryState {
//   nodes: Node<CustomNodeData>[];
//   edges: Edge[];
// }

// interface DbNode {
//   id: string;
//   type: string;
//   position_x: number;
//   position_y: number;
//   department: string;
//   task_name: string;
//   task_id: string;
// }

// interface DbEdge {
//   id: string;
//   source: string;
//   target: string;
// }

// const useWorkflowData = (taskId: string) => {
//   const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [history, setHistory] = useState<HistoryState[]>([]);
//   const [historyIndex, setHistoryIndex] = useState<number>(-1);
//   const isInitialFetch = useRef(true);

//   const saveToHistory = useCallback(() => {
//     setHistory(prev => [...prev.slice(0, historyIndex + 1), { nodes, edges }]);
//     setHistoryIndex(prev => prev + 1);
//   }, [nodes, edges, historyIndex]);

//   const fetchData = useCallback(async () => {
//     if (!taskId) {
//       console.error('taskId is undefined or empty');
//       setError('Invalid taskId');
//       return;
//     }
  
//     try {
//       const response = await fetch(`/api/workflow/${encodeURIComponent(taskId)}`);
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`);
//       }
//       const data = await response.json();
      
//       console.log('Raw fetched data:', data);
  
//       if (!data.nodes || !data.edges) {
//         throw new Error('Invalid data format received from server');
//       }
  
//       const flowNodes = data.nodes.map((node: any) => ({
//         id: node.id,
//         type: 'custom',
//         position: { x: node.position_x, y: node.position_y },
//         data: { department: node.department, task_name: node.task_name, task_id: node.task_id },
//       }));
  
//       console.log('Processed nodes:', flowNodes);
  
//       setNodes(flowNodes);
//       setEdges(data.edges.map((edge: any) => ({
//         id: edge.id,
//         source: edge.source,
//         target: edge.target,
//       })));
  
//     } catch (error: unknown) {
//       console.error('Error fetching workflow data:', error);
//       setError(`Failed to load workflow data: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }
//   }, [taskId]);

//   useEffect(() => {
//     if (isInitialFetch.current) {
//       fetchData();
//       isInitialFetch.current = false;
//     }
//   }, [fetchData]);

//   const onNodesChange = useCallback(
//     (changes: NodeChange[]) => {
//       setNodes((nds) => {
//         const updatedNodes = applyNodeChanges(changes, nds);
        
//         changes.forEach((change) => {
//           if (change.type === 'position' && !change.dragging) {
//             const updatedNode = updatedNodes.find(n => n.id === change.id);
//             if (updatedNode) {
//               fetch(`/api/workflow/node/position/${change.id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ x: updatedNode.position.x, y: updatedNode.position.y }),
//               }).catch(error => {
//                 console.error('Error updating node position:', error);
//                 setError('Failed to update node position. Please try again.');
//               });
//             }
//           }
//         });

//         saveToHistory();
//         return updatedNodes;
//       });
//     },
//     [saveToHistory]
//   );

//   const onEdgesChange = useCallback((changes: EdgeChange[]) => {
//     setEdges((eds) => {
//       const updatedEdges = applyEdgeChanges(changes, eds);
//       saveToHistory();
//       return updatedEdges;
//     });
//   }, [saveToHistory]);

//   const onConnect = useCallback((params: Connection) => {
//     setEdges((eds) => {
//       const newEdges = addEdge(params, eds);
//       saveToHistory();
//       return newEdges;
//     });
//   }, [saveToHistory]);

//   const addNode = useCallback(async (x: number, y: number) => {
//     const newNodeData: Omit<DbNode, 'id'> = {
//       type: 'custom',
//       position_x: x,
//       position_y: y,
//       department: 'New Department',
//       task_name: 'New Task',
//       task_id: taskId
//     };

//     try {
//       const response = await fetch('/api/workflow/node', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newNodeData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add new node');
//       }

//       const savedNode: DbNode = await response.json();

//       const newNode: Node<CustomNodeData> = {
//         id: savedNode.id,
//         type: 'custom',
//         position: { x: savedNode.position_x, y: savedNode.position_y },
//         data: { 
//           department: savedNode.department, 
//           task_name: savedNode.task_name,
//           task_id: savedNode.task_id
//         },
//       };

//       setNodes((nds) => {
//         const updatedNodes = [...nds, newNode];
//         saveToHistory();
//         return updatedNodes;
//       });
//     } catch (error) {
//       console.error('Error adding new node:', error);
//       setError('Failed to add new node. Please try again.');
//     }
//   }, [saveToHistory, taskId]);

//   const deleteNode = useCallback((nodeId: string) => {
//     setNodes((nds) => {
//       const updatedNodes = nds.filter((node) => node.id !== nodeId);
//       saveToHistory();
//       return updatedNodes;
//     });
//     setEdges((eds) => {
//       const updatedEdges = eds.filter(
//         (edge) => edge.source !== nodeId && edge.target !== nodeId
//       );
//       return updatedEdges;
//     });

//     fetch(`/api/workflow/node/${nodeId}`, {
//       method: 'DELETE',
//     }).catch(error => {
//       console.error('Error deleting node:', error);
//       setError('Failed to delete node. Please try again.');
//     });
//   }, [saveToHistory]);

//   const undo = useCallback(() => {
//     if (historyIndex > 0) {
//       setHistoryIndex(prev => prev - 1);
//       const prevState = history[historyIndex - 1];
//       setNodes(prevState.nodes);
//       setEdges(prevState.edges);
//     }
//   }, [history, historyIndex]);

//   const redo = useCallback(() => {
//     if (historyIndex < history.length - 1) {
//       setHistoryIndex(prev => prev + 1);
//       const nextState = history[historyIndex + 1];
//       setNodes(nextState.nodes);
//       setEdges(nextState.edges);
//     }
//   }, [history, historyIndex]);

//   const onStartEdit = useCallback((nodeId: string) => {
//     setEditingNodeId(nodeId);
//   }, []);

//   const onSaveEdit = useCallback((nodeId: string, newData: CustomNodeData) => {
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === nodeId) {
//           return { ...node, data: newData };
//         }
//         return node;
//       })
//     );
//     setEditingNodeId(null);
//     saveToHistory();

//     fetch(`/api/workflow/node/${nodeId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newData),
//     }).then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to update node');
//       }
//     }).catch(error => {
//       console.error('Error updating node:', error);
//       setError('Failed to update node. Please try again.');
//     });
//   }, [saveToHistory]);

//   return {
//     nodes,
//     edges,
//     editingNodeId,
//     error,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     onStartEdit,
//     onSaveEdit,
//     addNode,
//     deleteNode,
//     undo,
//     redo,
//   };
// };

// export default useWorkflowData;
import { useState, useEffect, useCallback, useRef } from 'react';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, Connection, addEdge } from 'reactflow';

interface CustomNodeData {
  department: string;
  task_name: string;
  task_id: string;
}

interface HistoryState {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
}

interface DbNode {
  id: string;
  type: string;
  position_x: number;
  position_y: number;
  department: string;
  task_name: string;
  task_id: string;
}

interface DbEdge {
  id: string;
  source: string;
  target: string;
  source_handle: string | null;
  target_handle: string | null;
}

const useWorkflowData = (taskId: string) => {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const isInitialFetch = useRef(true);

  // 操作履歴を保存する
  const saveToHistory = useCallback(() => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), { nodes, edges }]);
    setHistoryIndex(prev => prev + 1);
  }, [nodes, edges, historyIndex]);

  // サーバーからワークフローのデータをフェッチする
  const fetchData = useCallback(async () => {
    if (!taskId) {
      console.error('taskId is undefined or empty');
      setError('Invalid taskId');
      return;
    }
  
    try {
      const response = await fetch(`/api/workflow/${encodeURIComponent(taskId)}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorText}`);
      }
      const data = await response.json();
      
      console.log('Raw fetched data:', data);
  
      if (!data.nodes || !data.edges) {
        throw new Error('Invalid data format received from server');
      }
  
      const flowNodes = data.nodes.map((node: DbNode) => ({
        id: node.id,
        type: 'custom',
        position: { x: node.position_x, y: node.position_y },
        data: { department: node.department, task_name: node.task_name, task_id: node.task_id },
      }));
  
      console.log('Processed nodes:', flowNodes);
  
      setNodes(flowNodes);
      setEdges(data.edges.map((edge: DbEdge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.source_handle,
        targetHandle: edge.target_handle,
      })));
  
    } catch (error: unknown) {
      console.error('Error fetching workflow data:', error);
      setError(`Failed to load workflow data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [taskId]);

  // 初回のデータフェッチ
  useEffect(() => {
    if (isInitialFetch.current) {
      fetchData();
      isInitialFetch.current = false;
    }
  }, [fetchData]);

  // ノードの変更時の処理
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        
        changes.forEach((change) => {
          if (change.type === 'position' && !change.dragging) {
            const updatedNode = updatedNodes.find(n => n.id === change.id);
            if (updatedNode) {
              fetch(`/api/workflow/node/position/${change.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x: updatedNode.position.x, y: updatedNode.position.y }),
              }).catch(error => {
                console.error('Error updating node position:', error);
                setError('Failed to update node position. Please try again.');
              });
            }
          }
        });

        saveToHistory();
        return updatedNodes;
      });
    },
    [saveToHistory]
  );

  // エッジの変更時の処理
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      saveToHistory();
      return updatedEdges;
    });
  }, [saveToHistory]);

  // エッジが接続されたときの処理
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => {
      const newEdges = addEdge(params, eds);
      saveToHistory();
      return newEdges;
    });

    // サーバーにエッジの情報を送信して保存
    const newEdgeId = crypto.randomUUID();;
    fetch('/api/workflow/edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: newEdgeId,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle || null,
        targetHandle: params.targetHandle || null,
      }),
    }).catch(error => {
      console.error('Error saving edge:', error);
      setError('Failed to save edge. Please try again.');
    });
  }, [saveToHistory]);

  // ノードを追加する処理
  const addNode = useCallback(async (x: number, y: number) => {
    const newNodeData: Omit<DbNode, 'id'> = {
      type: 'custom',
      position_x: x,
      position_y: y,
      department: 'New Department',
      task_name: 'New Task',
      task_id: taskId
    };

    try {
      const response = await fetch('/api/workflow/node', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNodeData),
      });

      if (!response.ok) {
        throw new Error('Failed to add new node');
      }

      const savedNode: DbNode = await response.json();

      const newNode: Node<CustomNodeData> = {
        id: savedNode.id,
        type: 'custom',
        position: { x: savedNode.position_x, y: savedNode.position_y },
        data: { 
          department: savedNode.department, 
          task_name: savedNode.task_name,
          task_id: savedNode.task_id
        },
      };

      setNodes((nds) => {
        const updatedNodes = [...nds, newNode];
        saveToHistory();
        return updatedNodes;
      });
    } catch (error) {
      console.error('Error adding new node:', error);
      setError('Failed to add new node. Please try again.');
    }
  }, [saveToHistory, taskId]);

  // ノードを削除する処理
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.id !== nodeId);
      saveToHistory();
      return updatedNodes;
    });
    setEdges((eds) => {
      const updatedEdges = eds.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      return updatedEdges;
    });

    fetch(`/api/workflow/node/${nodeId}`, {
      method: 'DELETE',
    }).catch(error => {
      console.error('Error deleting node:', error);
      setError('Failed to delete node. Please try again.');
    });
  }, [saveToHistory]);

  // エッジを削除する処理
  const deleteEdge = useCallback((edgeId: string) => {
    setEdges((eds) => {
      const updatedEdges = eds.filter((edge) => edge.id !== edgeId);
      saveToHistory();
      return updatedEdges;
    });

    fetch(`/api/workflow/edge/${edgeId}`, {
      method: 'DELETE',
    }).catch(error => {
      console.error('Error deleting edge:', error);
      setError('Failed to delete edge. Please try again.');
    });
  }, [saveToHistory]);

  // Undo 操作
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
    }
  }, [history, historyIndex]);

  // Redo 操作
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [history, historyIndex]);

  // ノードの編集を開始する
  const onStartEdit = useCallback((nodeId: string) => {
    setEditingNodeId(nodeId);
  }, []);

  // ノードの編集を保存する
  const onSaveEdit = useCallback((nodeId: string, newData: CustomNodeData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
    setEditingNodeId(null);
    saveToHistory();

    fetch(`/api/workflow/node/${nodeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to update node');
      }
    }).catch(error => {
      console.error('Error updating node:', error);
      setError('Failed to update node. Please try again.');
    });
  }, [saveToHistory]);

  return {
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
    deleteEdge,
    undo,
    redo,
  };
};

export default useWorkflowData;
