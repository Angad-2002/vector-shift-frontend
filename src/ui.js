// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Background, MiniMap, useReactFlow, useStore as useReactFlowStore } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import FlowContent from './components/FlowContent';
import CustomDeletableEdge from './components/edges/CustomDeletableEdge';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  conditional: ConditionalNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
};

const edgeTypes = {
  deletable: CustomDeletableEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const ZOOM_DURATION = 500;

function zoomSelector(s) {
  return {
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom,
  };
}

// Inner component to access ReactFlow hooks
function FlowWithControls({ 
    nodesDraggable, 
    nodesConnectable, 
    onNodesDraggableChange, 
    onNodesConnectableChange,
    wrappedNodesChange,
    onNodeDragStopHandler,
    onNodesChange,
    showMiniMap,
    showControlsToolbar,
    onToggleMiniMap,
    onToggleControlsToolbar
}) {
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const { maxZoomReached, minZoomReached } = useReactFlowStore(zoomSelector, shallow);

    return (
        <>
            <FlowContent 
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                onNodesDraggableChange={onNodesDraggableChange}
                onNodesConnectableChange={onNodesConnectableChange}
                onNodesChange={onNodesChange}
                wrappedNodesChange={wrappedNodesChange}
                onNodeDragStopHandler={onNodeDragStopHandler}
                onZoomIn={() => zoomIn({ duration: ZOOM_DURATION })}
                onZoomOut={() => zoomOut({ duration: ZOOM_DURATION })}
                onFitView={() => fitView({ duration: ZOOM_DURATION })}
                minZoomReached={minZoomReached}
                maxZoomReached={maxZoomReached}
                showMiniMap={showMiniMap}
                showControlsToolbar={showControlsToolbar}
                onToggleMiniMap={onToggleMiniMap}
                onToggleControlsToolbar={onToggleControlsToolbar}
            />
        </>
    );
}

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodesDraggable, setNodesDraggable] = useState(true);
    const [nodesConnectable, setNodesConnectable] = useState(true);
    const [wrappedNodesChange, setWrappedNodesChange] = useState(null);
    const [onNodeDragStopHandler, setOnNodeDragStopHandler] = useState(null);
    const [showMiniMap, setShowMiniMap] = useState(true);
    const [showControlsToolbar, setShowControlsToolbar] = useState(true);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={wrappedNodesChange || onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={(instance) => {
                    setReactFlowInstance(instance);
                    instance.fitView({ duration: 500 });
                }}
                onNodeDragStop={onNodeDragStopHandler}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                snapToGrid
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                connectionLineType='default'
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{
                    type: 'deletable',
                }}
                minZoom={0.1}
                maxZoom={2}
                fitView
                nodeOrigin={[0, 0]}
            >
                <FlowWithControls 
                    nodesDraggable={nodesDraggable}
                    nodesConnectable={nodesConnectable}
                    onNodesDraggableChange={setNodesDraggable}
                    onNodesConnectableChange={setNodesConnectable}
                    onNodesChange={onNodesChange}
                    wrappedNodesChange={wrappedNodesChange}
                    onNodeDragStopHandler={onNodeDragStopHandler}
                    showMiniMap={showMiniMap}
                    showControlsToolbar={showControlsToolbar}
                    onToggleMiniMap={setShowMiniMap}
                    onToggleControlsToolbar={setShowControlsToolbar}
                />
            </ReactFlow>
        </div>
        </>
    )
}
