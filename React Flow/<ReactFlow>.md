<ReactFlow />
Source on GitHub

The <ReactFlow /> component is the heart of your React Flow application. It renders your nodes and edges, handles user interaction, and can manage its own state if used as an uncontrolled flow.

import { ReactFlow } from '@xyflow/react'
 
export default function Flow() {
  return <ReactFlow
    nodes={...}
    edges={...}
    onNodesChange={...}
    ...
  />
}
This component takes a lot of different props, most of which are optional. We've tried to document them in groups that make sense to help you find your way.

Common props
These are the props you will most commonly use when working with React Flow. If you are working with a controlled flow with custom nodes, you will likely use almost all of these!

Name	Type	Default
#nodes
Node[]
An array of nodes to render in a controlled flow.
[]
#edges
Edge[]
An array of edges to render in a controlled flow.
[]
#defaultNodes
Node[]
The initial nodes to render in an uncontrolled flow.
[]
#defaultEdges
Edge[]
The initial edges to render in an uncontrolled flow.
[]
#onNodesChange
(changes: NodeChange[]) => void
Use this event handler to add interactivity to a controlled flow. It is called on node drag, select, and move.
#onEdgesChange
(changes: EdgeChange[]) => void
Use this event handler to add interactivity to a controlled flow. It is called on edge select and remove.
#onConnect
(connection: Connection) => void
When a connection line is completed and two nodes are connected by the user, this event fires with the new connection. You can use the addEdge utility to convert the connection to a complete edge.
#nodeTypes
Record<String, React.ComponentType<NodeProps>>
If you want to use custom nodes in your flow, you need to let React Flow know about them. When rendering a new node, React Flow will look up that node's type in this object and render the corresponding component.
{
  input: InputNode,
  default: DefaultNode,
  output: OutputNode
  group: GroupNode
}
#edgeTypes
Record<String, React.ComponentType<EdgeProps>>
As with node types, this prop lets you use custom edges in your flow by mapping edge types to React components.
{
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge
  simplebezier: SimpleBezier
}
#nodeOrigin
[number, number]
The origin of the node to use when placing it in the flow or looking up its x and y position. An origin of [0,0] means that a node's top left corner will be placed at the x and y position.
[0,0]
#nodeDragThreshold
number
With a threshold greater than zero you can delay node drag events. If threshold equals 1, you need to drag the node 1 pixel before a drag event is fired. 1 is the default values, so clicks don't trigger drag events.
1
#nodeClickDistance
number
The max distance between mousedown/up that will trigger a click.
0
#paneClickDistance
number
The max distance between mousedown/up that will trigger a click.
0
#style
React.CSSProperties
#className
string
#proOptions
ProOptions
Our pro options are configuration settings intended for our Pro subscribers. Anyone is free to use them, though!
#colorMode
"system" | "light" | "dark"
React Flow has 2 built-in color themes: light and dark. By default it will try to adopt the users systems color theme.
"system"
Viewport props
Name	Type	Default
#defaultViewport
Viewport
Sets the initial position and zoom of the viewport. If a default viewport is provided but fitView is enabled, the default viewport will be ignored.
{ x: 0, y: 0, zoom: 1 }
#viewport
Viewport
When you pass a viewport prop, it's controlled and you also need to pass onViewportChange to handle internal changes.
{ x: 0, y: 0, zoom: 1 }
#onViewportChange
(viewport: Viewport) => void
Used when working with a controlled viewport for updating the user viewport state.
#fitView
boolean
When true, the flow will be zoomed and panned to fit all the nodes initially provided.
false
#fitViewOptions
FitViewOptions
When you typically call fitView on a ReactFlowInstance, you can provide an object of options to customize its behaviour. This prop lets you do the same for the initial fitView call.
#minZoom
number
0.5
#maxZoom
number
2
#snapToGrid
boolean
When enabled, nodes will snap to the grid when dragged.
false
#snapGrid
[number, number]
If snapToGrid is enabled, this prop configures the grid that nodes will snap to.
[25,25]
#onlyRenderVisibleElements
boolean
You can enable this optimisation to instruct React Flow to only render nodes and edges that would be visible in the viewport.
false
#translateExtent
CoordinateExtent
By default the viewport extends infinitely. You can use this prop to set a boundary. The first pair of coordinates is the top left boundary and the second pair is the bottom right.
[[-∞,-∞], [+∞,+∞]]
#nodeExtent
CoordinateExtent
As with translateExtent, this prop lets you set a boundary for governing where nodes can be placed.
[[-∞,-∞], [+∞,+∞]]
#preventScrolling
boolean
Disabling this prop will allow the user to scroll the page even when their pointer is over the flow.
true
#attributionPosition
PanelPosition
By default, React Flow will render a small attribution in the bottom right corner of the flow. You can use this prop to change its position in case you want to place something else there.
"bottom-right"
Edge props
Name	Type	Default
#elevateEdgesOnSelect
boolean
Enabling this option will raise the z-index of edges connected to a node when selected.
false
#defaultMarkerColor
string
"#b1b1b7"
#defaultEdgeOptions
DefaultEdgeOptions
Any defaults set here will be applied to all new edges that are added to the flow. Properties on a new edge will override these defaults if they exist.
#reconnectRadius
number
The radius around an edge connection that can trigger an edge reconnection.
10
#edgesReconnectable
boolean
Whether or not edges can be updated once they are created. When both this prop is true and an onReconnect handler is provided, the user can drag an existing edge to a new source or target. Individual edges can override this value with their reconnectable property.
true
Event handlers
It's important to remember to define any event handlers outside of your component or using React's useCallback hook. If you don't, this can cause React Flow to enter an infinite re-render loop!

General Events
Name	Type
#onInit
(instance: ReactFlowInstance) => void
The onInit callback is called when the viewport is initialized. At this point you can use the instance to call methods like fitView or zoomTo.
#onError
(code: string, message: string) => void
Ocassionally something may happen that causes React Flow to error. Instead of exploding your application, we log a message to the console and then call this event handler. You might use it for additional logging or to show a message to the user.
#onDelete
({nodes: Node[], edges: Edge[]}) => void
This handler gets called when a Node or Edge is deleted.
#onBeforeDelete
({nodes: Node[], edges: Edge[]}) => Promise<boolean | {nodes: Node[], edges: Edge[]}>
This handler gets before Nodes or Edges are about to be deleted. Deletion can be aborted by returning false or the nodes and edges to be deleted can be modified.
Node Events
Name	Type
#onNodeClick
(event: React.MouseEvent, node: Node) => void
#onNodeDoubleClick
(event: React.MouseEvent, node: Node) => void
#onNodeDragStart
(event: React.MouseEvent, node: Node, nodes: Node[]) => void
#onNodeDrag
(event: React.MouseEvent, node: Node, nodes: Node[]) => void
#onNodeDragStop
(event: React.MouseEvent, node: Node, nodes: Node[]) => void
#onNodeMouseEnter
(event: React.MouseEvent, node: Node) => void
#onNodeMouseMove
(event: React.MouseEvent, node: Node) => void
#onNodeMouseLeave
(event: React.MouseEvent, node: Node) => void
#onNodeContextMenu
(event: React.MouseEvent, node: Node) => void
#onNodesDelete
(nodes: Node[]) => void
#onNodesChange
OnNodesChange
Use this event handler to add interactivity to a controlled flow. It is called on node drag, select, and move.
Edge Events
Name	Type
#onEdgeClick
(event: React.MouseEvent, edge: Edge) => void
#onEdgeDoubleClick
(event: React.MouseEvent, edge: Edge) => void
#onEdgeMouseEnter
(event: React.MouseEvent, edge: Edge) => void
#onEdgeMouseMove
(event: React.MouseEvent, edge: Edge) => void
#onEdgeMouseLeave
(event: React.MouseEvent, edge: Edge) => void
#onEdgeContextMenu
(event: React.MouseEvent, edge: Edge) => void
#onReconnect
(oldEdge: Edge, newConnection: Connection) => void
This handler is called when the source or target of an reconnectable edge is dragged from the current node. It will fire even if the edge's source or target do not end up changing. You can use the reconnectEdge utility to convert the connection to a new edge.
#onReconnectStart
(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void
This event fires when the user begins dragging the source or target of an editable edge.
#onReconnectEnd
(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void
This event fires when the user releases the source or target of an editable edge. It is called even if an edge update does not occur.
#onEdgesDelete
(edges: Edge[]) => void
#onEdgesChange
OnEdgesChange
Use this event handler to add interactivity to a controlled flow. It is called on edge select and remove.
Connection Events
Name	Type
#onConnect
(connection: Connection) => void
When a connection line is completed and two nodes are connected by the user, this event fires with the new connection. You can use the addEdge utility to convert the connection to a complete edge.
#onConnectStart
(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: "source" | "target" | null; }) => void
#onConnectEnd
(event: React.MouseEvent) => void
#onClickConnectStart
(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: "source" | "target" | null; }) => void
#onClickConnectEnd
(event: React.MouseEvent) => void
#isValidConnection
(connection: Connection) => boolean
This callback can be used to validate a new connection. If you return false, the edge will not be added to your flow. If you have custom connection logic its preferred to use this callback over the isValidConnection prop on the handle component for performance reasons.
Pane Events
Name	Type
#onMove
(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void
This event handler is called while the user is either panning or zooming the viewport.
#onMoveStart
(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void
This event handler is called when the user begins to pan or zoom the viewport.
#onMoveEnd
(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void
This event handler is called while the user stops either panning or zooming the viewport.
#onPaneClick
(event: React.MouseEvent) => void
#onPaneContextMenu
(event: React.MouseEvent) => void
#onPaneScroll
(event: React.MouseEvent) => void
#onPaneMouseMove
(event: React.MouseEvent) => void
#onPaneMouseEnter
(event: React.MouseEvent) => void
#onPaneMouseLeave
(event: React.MouseEvent) => void
Selection Events
Name	Type
#onSelectionChange
(params: { nodes: Node[]; edges: Edge[]; }) => void
#onSelectionDragStart
(event: React.MouseEvent, nodes: Node[]) => void
#onSelectionDrag
(event: React.MouseEvent, nodes: Node[]) => void
#onSelectionDragStop
(event: React.MouseEvent, nodes: Node[]) => void
#onSelectionStart
() => void
#onSelectionEnd
() => void
#onSelectionContextMenu
(event: React.MouseEvent, nodes: Node[]) => void
This event handler is called when a user right-clicks on a node selection.
Interaction props
Name	Type	Default
#nodesDraggable
boolean
Controls whether all nodes should be draggable or not. Individual nodes can override this setting by setting their draggable prop. If you want to use the mouse handlers on non-draggable nodes, you need to add the "nopan" class to those nodes.
true
#nodesConnectable
boolean
Controls whether all nodes should be connectable or not. Individual nodes can override this setting by setting their connectable prop.
true
#nodesFocusable
boolean
When true, focus between nodes can be cycled with the Tab key and selected with the Enter key. This option can be overriden by individual nodes by setting their focusable prop.
true
#edgesFocusable
boolean
When true, focus between edges can be cycled with the Tab key and selected with the Enter key. This option can be overriden by individual edges by setting their focusable prop.
true
#elementsSelectable
boolean
When true, elements (nodes and edges) can be selected by clicking on them. This option can be overriden by individual elements by setting their selectable prop.
true
#autoPanOnConnect
boolean
When try, the viewport will pan automatically when the cursor moves to the edge of the viewport while creating a connection.
true
#autoPanOnNodeDrag
boolean
When true, the viewport will pan automatically when the cursor moves to the edge of the viewport while dragging a node.
true
#autoPanSpeed
number
The speed at which the viewport will pan for autoPanOnNodeDrag and autoPanOnConnect
20
#panOnDrag
boolean | (0 | 1 | 2 | 3 | 4)[]
Enabling this prop allows users to pan the viewport by clicking and dragging. You can also set this prop to an array of numbers to limit which mouse buttons can activate panning. For example, [0,2] would allow panning with the left and right mouse buttons.
true
#selectionOnDrag
boolean
false
#selectionMode
"partial" | "full"
When set to "partial", when the user creates a selection box by click and dragging nodes that are only partially in the box are still selected.
"full"
#panOnScroll
boolean
false
#panOnScrollSpeed
number
#panOnScrollMode
PanOnScrollMode
This prop is used to limit the direction of panning when panOnScroll is enabled. The "free" option allows panning in any direction.
PanOnScrollMode
.Free
#zoomOnScroll
boolean
true
#zoomOnPinch
boolean
true
#zoomOnDoubleClick
boolean
true
#selectNodesOnDrag
boolean
true
#elevateNodesOnSelect
boolean
Enabling this option will raise the z-index of nodes when they are selected.
true
#connectOnClick
boolean
The connectOnClick option lets you click or tap on a source handle to start a connection and then click on a target handle to complete the connection. If you set this option to false, users will need to drag the connection line to the target handle to create a connection.
true
#connectionMode
"loose" | "strict"
A loose connection mode will allow you to connect handles of any type to one another. The strict mode will only allow you to connect source handles to target handles.
"strict"
Connection line props
Name	Type	Default
#connectionRadius
number
The radius around a handle where you drop a connection line to create a new edge.
20
#connectionLineType
ConnectionLineType
The type of edge path to use for connection lines. Although created edges can be of any type, React Flow needs to know what type of path to render for the connection line before the edge is created!
ConnectionLineType
.Bezier
#connectionLineStyle
React.CSSProperties
#connectionLineComponent
React.ComponentType<ConnectionLineComponentProps>
#connectionLineWrapperStyles
React.CSSProperties
Keyboard props
React Flow let's you pass in a few different keyboard shortcuts as another way to interact with your flow. We've tried to set up sensible defaults like using backspace to delete any selected nodes or edges, but you can use these props to set your own.

To disable any of these shortcuts, pass in null to to the prop you want to disable.

Name	Type	Default
#deleteKeyCode
string | string[] | null
If set, pressing the key or chord will delete any selected nodes and edges. Passing an array represents mutliple keys that can be pressed. For example, ["Delete", "Backspace"] will delete selected elements when either key is pressed.
"Backspace"
#selectionKeyCode
string | string[] | null
If set, holding this key will let you click and drag to draw a selection box around multiple nodes and edges. Passing an array represents mutliple keys that can be pressed. For example, ["Shift", "Meta"] will allow you to draw a selection box when either key is pressed.
"Shift"
#multiSelectionKeyCode
string | string[] | null
"Meta" for MacOs, "Control" for other systems
#zoomActivationKeyCode
string | string[] | null
If a key is set, you can zoom the viewport while that key is held down even if panOnScroll is set to false. By setting this prop to null you can disable this functionality.
"Meta" for MacOs, "Control" for other systems
#panActivationKeyCode
string | string[] | null
If a key is set, you can pan the viewport while that key is held down even if panOnScroll is set to false. By setting this prop to null you can disable this functionality.
"Space"
#disableKeyboardA11y
boolean
You can use this prop to disable keyboard accessibility features such as selecting nodes or moving selected nodes with the arrow keys.
false
Style props
Applying certain classes to elements rendered inside the canvas will change how interactions are handled. These props let you configure those class names if you need to.

Name	Type	Default
#noPanClassName
string
If an element in the canvas does not stop mouse events from propagating, clicking and dragging that element will pan the viewport. Adding the "nopan" class prevents this behaviour and this prop allows you to change the name of that class.
"nopan"
#noDragClassName
string
If a node is draggable, clicking and dragging that node will move it around the canvas. Adding the "nodrag" class prevents this behaviour and this prop allows you to change the name of that class.
"nodrag"
#noWheelClassName
string
Typically, scrolling the mouse wheel when the mouse is over the canvas will zoom the viewport. Adding the "nowheel" class to an element in the canvas will prevent this behaviour and this prop allows you to change the name of that class.
"nowheel"
Notes
The props of this component get exported as ReactFlowProps
