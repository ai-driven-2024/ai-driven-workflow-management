Plugin Components
React Flow comes with several additional plugin components. In this guide we show you how to use them. We are using our previous example code here.

MiniMap
If your flow gets bigger, you might want to get an overview quickly. For this we have built the MiniMap component. You can easily add it to your flow by adding it as a children:

App.js
nodes.js
edges.js
import { ReactFlow, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
    </ReactFlow>
  );
}

export default Flow;



Open Sandbox
Controls
React Flow comes with a customizable controls bar, that you can use by importing the Controls component

App.js
nodes.js
edges.js
import { ReactFlow, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Controls />
    </ReactFlow>
  );
}

export default Flow;



Open Sandbox
Background
If you want to display the pattern background, you can use the Background component

App.js
nodes.js
edges.js
import { useState } from 'react';
import { ReactFlow, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

function Flow() {
  const [variant, setVariant] = useState('cross');

  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Background color="#ccc" variant={variant} />
      <Panel>
        <div>variant:</div>
        <button onClick={() => setVariant('dots')}>dots</button>
        <button onClick={() => setVariant('lines')}>lines</button>
        <button onClick={() => setVariant('cross')}>cross</button>
      </Panel>
    </ReactFlow>
  );
}

export default Flow;



Open Sandbox
Panel
A helper component to display content on top of the React Flow viewport. Panel component

App.js
style.css
import { ReactFlow, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './style.css';

const nodes = [
  {
    id: '1',
    data: { label: 'this is an example flow for the <Panel /> component' },
    position: { x: 0, y: 0 },
  },
];

function Flow() {
  return (
    <ReactFlow nodes={nodes} fitView>
      <Panel position="top-left">top-left</Panel>
      <Panel position="top-center">top-center</Panel>
      <Panel position="top-right">top-right</Panel>
      <Panel position="bottom-left">bottom-left</Panel>
      <Panel position="bottom-center">bottom-center</Panel>
      <Panel position="bottom-right">bottom-right</Panel>
      <Background variant="cross" />
    </ReactFlow>
  );
}

export default Flow;



Open Sandbox
