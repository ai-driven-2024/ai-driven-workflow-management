import { useState, useEffect, useCallback, useRef } from 'react';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, Connection, addEdge } from 'reactflow';

interface CustomNodeData {
  department: string;
  task_name: string;
}

interface HistoryState {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
}

const useWorkflowData = () => {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const isInitialFetch = useRef(true);

  const saveToHistory = useCallback(() => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), { nodes, edges }]);
    setHistoryIndex(prev => prev + 1);
  }, [nodes, edges, historyIndex]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/workflow');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { nodes: dbNodes, edges: dbEdges } = await response.json();
      const flowNodes = dbNodes.map((node: any) => ({
        id: node.id,
        type: 'custom',
        position: { x: node.position_x, y: node.position_y },
        data: { department: node.department, task_name: node.task_name },
      }));
      const flowEdges = dbEdges.map((edge: any) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      }));
      setNodes(flowNodes);
      setEdges(flowEdges);
      saveToHistory();
    } catch (error: unknown) {
      console.error('Error fetching workflow data:', error);
      setError('Failed to load workflow data. Please try again later.');
    }
  }, [saveToHistory]);

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchData();
      isInitialFetch.current = false;
    }
  }, [fetchData]);

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

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      saveToHistory();
      return updatedEdges;
    });
  }, [saveToHistory]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => {
      const newEdges = addEdge(params, eds);
      saveToHistory();
      return newEdges;
    });
  }, [saveToHistory]);

  const addNode = useCallback((x: number, y: number) => {
    const newNode: Node<CustomNodeData> = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x, y },
      data: { department: 'New Department', task_name: 'New Task' },
    };
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      saveToHistory();
      return updatedNodes;
    });

    fetch('/api/workflow/node', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNode),
    }).catch(error => {
      console.error('Error adding new node:', error);
      setError('Failed to add new node. Please try again.');
    });
  }, [saveToHistory]);

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

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [history, historyIndex]);

  const onStartEdit = useCallback((nodeId: string) => {
    setEditingNodeId(nodeId);
  }, []);

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
    undo,
    redo,
  };
};

export default useWorkflowData;