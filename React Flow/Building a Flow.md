Building a Flow
In this section we are explaining how to create a controlled flow component. Now that you've installed React Flow into your React project, all files are in place to start using React Flow.

Getting Started
Let's create an empty flow with a controls panel and a background. For this we need to import the components from the reactflow package:

import { ReactFlow, Background, Controls } from '@xyflow/react';
We can now use the components to render an empty flow:

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;


Open Sandbox
There are three important things to keep in mind here:

You need to import the styles. Otherwise React Flow won't work.
The parent container needs a width and a height, because React Flow uses its parent dimensions.
If you have multiple flows on one page, you need to pass a unique id prop to each component to make React Flow work properly.
Adding Nodes
Now that the flow is set up, let's add some nodes. To do this, you need to create an array with node objects like this:

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
    data: { label: 'Hello' }, // required
  },
];
These nodes can now be added to the flow:

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
  },
];

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;


Open Sandbox
Let's add another node, configure labels and use the node type input for the first node.

const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
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

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;


Open Sandbox
There are plenty of ways to configure nodes. You can see the full list of options on the node option site.

This looks good. Let's attach these two nodes.

Adding an Edge
Now that we have two nodes, let's connect them with an edge.

To make an edge, we need to specify two attributes: the source node (where the edge begins) and the target node (where the edge ends). We use the id of the two nodes to specify this (in our example, our two nodes have ids of "1" and "2"):

const edges = [{ id: '1-2', source: '1', target: '2' }];
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const edges = [{ id: '1-2', source: '1', target: '2' }];

const nodes = [
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

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;


Open Sandbox
Let's give this edge two properties that are built into React Flow, a label and a different type.

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const edges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const nodes = [
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

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;



Open Sandbox
You made your first edge, nice work! You might have realised that you can't drag or select nodes. In the next part you'll learn how to make the flow interactive.