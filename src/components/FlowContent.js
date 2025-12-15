// FlowContent.js
// Inner component to use ReactFlow hooks for auto-adjustment

import { useCallback, useEffect } from 'react';
import { Background, MiniMap } from 'reactflow';
import { useNodeAutoAdjust } from '../hooks/useNodeAutoAdjust';
import { PipelineToolbar } from '../toolbar';

export default function FlowContent({ 
    nodesDraggable, 
    nodesConnectable, 
    onNodesDraggableChange, 
    onNodesConnectableChange, 
    onNodesChange,
    wrappedNodesChange,
    onNodeDragStopHandler,
    onZoomIn,
    onZoomOut,
    onFitView,
    minZoomReached,
    maxZoomReached,
    showMiniMap,
    showControlsToolbar,
    onToggleMiniMap,
    onToggleControlsToolbar
}) {
    const autoAdjustNode = useNodeAutoAdjust();

    return (
        <>
            <Background color="#1e293b" gap={20} />
            <PipelineToolbar 
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                onNodesDraggableChange={onNodesDraggableChange}
                onNodesConnectableChange={onNodesConnectableChange}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onFitView={onFitView}
                minZoomReached={minZoomReached}
                maxZoomReached={maxZoomReached}
                showMiniMap={showMiniMap}
                showControlsToolbar={showControlsToolbar}
                onToggleMiniMap={onToggleMiniMap}
                onToggleControlsToolbar={onToggleControlsToolbar}
            />
            {showMiniMap && <MiniMap />}
        </>
    );
}
