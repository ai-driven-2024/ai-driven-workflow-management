Adding Interactivity
Let's make it so we can select, drag, and remove nodes and edges.

In this Getting Started tutorial, we are going to use a "controlled component", which is typically the best and most flexible way to use React Flow in your own applications. You can also use React Flow in an uncontrolled way.

Handle Change Events
First let's import a few things. To manage the changes in React Flow, we'll be using useState and the two helper function applyEdgeChanges and applyNodeChanges from React Flow.

import { useState, useCallback } from 'react';
import { ReactFlow, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
We're going to set up states for both the nodes and edges:

const [nodes, setNodes] = useState(initialNodes);
const [edges, setEdges] = useState(initialEdges);
Directly beneath that, we'll add these two functions:

const onNodesChange = useCallback(
  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  [],
);
const onEdgesChange = useCallback(
  (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  [],
);
When you drag or select a node, the onNodeChange handler gets called. With help of the applyNodeChanges function you can then apply those changes to your current node state. Putting everything together, it should look like this:

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );


Open Sandbox
Now if you run your application, you'll be able to click and drag the components, and the UI will update based on those movements.

Handle Connections
One last piece is missing: connecting nodes manually. For this we need to implement an onConnect handler and pass it to the <ReactFlow /> component as well:

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;



Open Sandbox
Try to connect the two nodes by dragging from on handle to another one. That's it. You've built a fully interactive flow.

That's it for now :) You made it! If you want to move on, we recommend to check out the "Custom Nodes" guide.