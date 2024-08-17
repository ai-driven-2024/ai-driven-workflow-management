Custom Nodes
A powerful feature of React Flow is the ability to add custom nodes. Within your custom nodes you can render everything you want. You can define multiple source and target handles and render form inputs or charts for example. In this section we will implement a node with an input field that updates some text in another part of the application.

Implementing the Custom Node
A custom node is a React component that is wrapped to provide basic functionality like selecting or dragging. From the wrapper component we are passing props like the position or the data besides other props. Let's start to implement the TextUpdaterNode. We are using the Handle component to be able to connect our custom node with other nodes and add an input field to the node:

import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
As you see we've added the class name "nodrag" to the input. This prevents dragging within the input field and lets us select text for example.

Adding the Node Type
You can add a new node type to React Flow by adding it to the nodeTypes prop. It's important that the nodeTypes are memoized or defined outside of the component. Otherwise React creates a new object on every render which leads to performance issues and bugs.

const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
 
return <ReactFlow nodeTypes={nodeTypes} />;
After defining your new node type, you can use it by using the type node option:

const nodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
After putting all together and adding some basic styles we get a custom node that prints text to the console:

App.js
TextUpdaterNode.js
text-updater-node.css
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],


Open Sandbox
Using Multiple Handles
As you can see we added two source handles to the node so that it has two outputs. If you want to connect other nodes with these specific handles, the node id is not enough but you also need to pass the specific handle id. In this case one handle has the id "a" and the other one "b". Handle specific edges use the sourceHandle or targetHandle options that reference a handle within a node:

const initialEdges = [
  { id: 'edge-1', source: 'node-1', sourceHandle: 'a', target: 'node-2' },
  { id: 'edge-2', source: 'node-1', sourceHandle: 'b', target: 'node-3' },
];
In this case the source node is node-1 for both handles but the handle ids are different. One comes from handle id "a" and the other one from "b". Both edges also have different target nodes:

App.js
TextUpdaterNode.js
text-updater-node.css
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },


Open Sandbox
Note that if you are programmatically changing the position or number of handles in your custom node, you will need to use the useUpdateNodeInternals hook to properly notify ReactFlow of changes. From here you should be able to build your custom nodes. In most cases we recommend to use custom nodes only. The built-in ones are just basic examples. You can find a list of the passed props and more information in the custom node API section.