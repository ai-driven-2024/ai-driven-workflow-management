Panning and Zooming
The default pan and zoom behaviour of React Flow is inspired by slippy maps. You pan by dragging and zoom by scrolling. You can customize this behaviour easily with the provided props:

panOnDrag: default: true
selectionOnDrag: default: false (available since 11.4.0)
panOnScroll: default: false (Overwrites zoomOnScroll)
panOnScrollSpeed: default: 0.5
panOnScrollMode: default: 'free'. 'free' (all directions), 'vertical' (only vertical) or 'horizontal' (only horizontal)
zoomOnScroll: default: true
zoomOnPinch: default: true
zoomOnDoubleClick: default: true
preventScrolling: default: true (browser scroll behaviour is prevented)
zoomActivationKeyCode: default 'Meta'
panActivationKeyCode: default 'Space' (available since 11.4.0)
Default Viewport Controls
As mentioned above, the default controls are:

pan: drag mouse
zoom: scroll
create selection: Shift + drag
App.js
nodes.js
edges.js
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import initialNodes from './nodes.js';
import initialEdges from './edges.js';

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
}

export default Flow;



Open Sandbox
Figma-like Viewport Controls
If you prefer figma/sketch/design tool controls you can set panOnScroll={true} and selectionOnDrag={true}:

pan: Space + drag mouse, scroll, middle or right mouse
zoom: pitch or cmd + scroll
create selection: drag mouse
App.js
nodes.js
edges.js
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import initialNodes from './nodes.js';
import initialEdges from './edges.js';

const panOnDrag = [1, 2];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      panOnScroll
      selectionOnDrag
      panOnDrag={panOnDrag}
      selectionMode={SelectionMode.Partial}
    />
  );
}

export default Flow;



Open Sandbox
In this example we also set selectionMode={SelectionMode.Partial} to be able to add nodes to a selection that are only partially selected.