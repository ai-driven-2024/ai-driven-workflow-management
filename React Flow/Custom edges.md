Custom edges
Like custom nodes, parts of a custom edge in React Flow are just React components: that means you can render anything you want along an edge! This guide shows you how to implement a custom edge with some additional controls.

A basic custom edge
An edge isn't much use to us if it doesn't render a path between two connected nodes. These paths are always SVG-based and are typically rendered using the <BaseEdge /> component. To calculate the actual SVG path to render, React Flow comes with some handy utility functions:

getBezierPath
getSimpleBezierPath
getSmoothStepPath
getStraightPath
To kick start our custom edge, we'll just render a straight path between the source and target.

import { BaseEdge, getStraightPath } from '@xyflow/react';
 
export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
All the props passed to your custom edge component can be found in the API reference under the EdgeProps type.

This gives us a straight edge that behaves the same as the default "straight" edge type. To use it, we also need to update the edgeTypes prop on the <ReactFlow /> component.

It's important to define the edgeTypes object outside of the component or to use React's useMemo hook to prevent unnecessary re-renders. React Flow will show a warning in the console if you forget to do this.

import ReactFlow from '@xyflow/react'
import CustomEdge from './CustomEdge'
 
 
const edgeTypes = {
  'custom-edge': CustomEdge
}
 
export function Flow() {
  return <ReactFlow edgeTypes={edgeTypes} ... />
}
After defining the edgeTypes object, we can use our new custom edge by setting the type field of an edge to "custom-edge".

App.js
CustomEdge.js
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomEdge from './CustomEdge';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
];

const initialEdges = [
  { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
];

const edgeTypes = {
  'custom-edge': CustomEdge,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (


Open Sandbox
Adding an edge label
One of the more common uses for custom edges is rendering some controls or info along an edge's path. In React Flow we call that an edge label and unlike the edge path, edge labels can be any React component!

To render a custom edge label we must wrap it in the <EdgeLabelRenderer /> component. This is necessary for performance reasons: the edge label renderer is a portal to a single container that all edge labels are rendered into.

Let's add a button to our custom edge that can be used to delete the edge it's attached to:

import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
 
export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
If we try to use this edge now, we'll see that the button is rendered in the centre of the flow (it might be hidden behind "Node A"). Because of the edge label portal, we'll need to do some extra work to position the button ourselves.

A screen shot of a simple flow. The edge label renderer is highlighted in the DOM inspector and the button is rendered in the centre of the flow.
Fortunately, the path utils we've already seen can help us with this! Along with the SVG path to render, these functions also return the x and y coordinates of the path's midpoint. We can then use these coordinates to translate our custom edge label's into the right position!

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({ ... });
 
  return (
    ...
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
    ...
  );
}
To make sure our edge labels are interactive and not just for presentation, it is important to add pointer-events: all to the label's style. This will ensure that the label is clickable.

And just like with interactive controls in custom nodes, we need to remember to add the nodrag and nopan classes to the label to stop mouse events from controlling the canvas.

Here's an interactive example with our updated custom edge. Clicking the delete button will remove that edge from the flow. Creating a new edge will use the custom node.

App.js
CustomEdge.js
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomEdge from './CustomEdge';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
  { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
];

const initialEdges = [
  { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
  { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
];

const edgeTypes = {
  'custom-edge': CustomEdge,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={edgeTypes}
      fitView
    />
  );
}

export default Flow;



Open Sandbox
