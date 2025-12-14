// FlowContent.js
// Inner component to use ReactFlow hooks for auto-adjustment

import { useCallback, useEffect, useRef } from 'react';
import { Background, MiniMap, useReactFlow } from 'reactflow';
import CustomControls from './CustomControls';
import { useNodeAutoAdjust } from '../hooks/useNodeAutoAdjust';

export default function FlowContent({ 
    nodesDraggable, 
    nodesConnectable, 
    onNodesDraggableChange, 
    onNodesConnectableChange, 
    onNodesChange,
    setWrappedNodesChange,
    setOnNodeDragStop
}) {
    const autoAdjustNode = useNodeAutoAdjust();
    const { getNodes } = useReactFlow();

    const handleAutoAdjustNodeAfterNodeMeasured = useCallback(
        (id) => {
            setTimeout(() => {
                const node = getNodes().find(n => n.id === id);
                if (!node) { return; }

                if (node.measured === undefined) {
                    handleAutoAdjustNodeAfterNodeMeasured(id);
                    return;
                }

                autoAdjustNode(node);
            });
        },
        [autoAdjustNode, getNodes],
    );

    const wrappedHandleNodesChange = useCallback(
        (changes) => {
            onNodesChange(changes);

            changes.forEach((change) => {
                if (change.type === 'dimensions') {
                    const node = getNodes().find(n => n.id === change.id);
                    if (node) {
                        autoAdjustNode(node);
                    }
                }

                if (change.type === 'add') {
                    handleAutoAdjustNodeAfterNodeMeasured(change.item.id);
                }
            });
        },
        [
            autoAdjustNode,
            getNodes,
            handleAutoAdjustNodeAfterNodeMeasured,
            onNodesChange,
        ],
    );

    const handleNodeDragStop = useCallback(
        (_, node) => {
            autoAdjustNode(node);
        },
        [autoAdjustNode],
    );

    // Expose handlers to parent
    useEffect(() => {
        if (setWrappedNodesChange) {
            setWrappedNodesChange(() => wrappedHandleNodesChange);
        }
        if (setOnNodeDragStop) {
            setOnNodeDragStop(() => handleNodeDragStop);
        }
    }, [wrappedHandleNodesChange, handleNodeDragStop, setWrappedNodesChange, setOnNodeDragStop]);

    return (
        <>
            <Background color="#1e293b" gap={20} />
            <CustomControls 
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                onNodesDraggableChange={onNodesDraggableChange}
                onNodesConnectableChange={onNodesConnectableChange}
            />
            <MiniMap />
        </>
    );
}
