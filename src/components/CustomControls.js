// CustomControls.js
// Custom zoom controls matching chatbot-flow-builder-starter-kit

import { Controls, useReactFlow, useStore } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { Plus, Minus, Maximize2, Lock, Unlock } from 'lucide-react';

const ZOOM_DURATION = 500;

function selector(s) {
  return {
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom,
  };
}

export default function CustomControls({ nodesDraggable, nodesConnectable, onNodesDraggableChange, onNodesConnectableChange }) {
  const { maxZoomReached, minZoomReached } = useStore(selector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const toggleInteractivity = () => {
    const newState = !nodesDraggable;
    if (onNodesDraggableChange) {
      onNodesDraggableChange(newState);
    }
    if (onNodesConnectableChange) {
      onNodesConnectableChange(newState);
    }
  };

  return (
    <Controls
      showFitView={false}
      showZoom={false}
      showInteractive={false}
      position="bottom-left"
    >
      <button
        type="button"
        onClick={() => zoomIn({ duration: ZOOM_DURATION })}
        disabled={maxZoomReached}
        className="border-none flex disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed items-center justify-center bg-transparent w-7 h-7 text-text-primary rounded-md transition active:bg-dark-200 hover:bg-dark-300"
        title="Zoom In"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => zoomOut({ duration: ZOOM_DURATION })}
        disabled={minZoomReached}
        className="border-none flex disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed items-center justify-center bg-transparent w-7 h-7 text-text-primary rounded-md transition active:bg-dark-200 hover:bg-dark-300"
        title="Zoom Out"
      >
        <Minus className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => fitView({ duration: ZOOM_DURATION })}
        className="border-none flex items-center justify-center bg-transparent w-7 h-7 text-text-primary rounded-md transition active:bg-dark-200 hover:bg-dark-300"
        title="Fit View"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={toggleInteractivity}
        className={`border-none flex items-center justify-center bg-transparent w-7 h-7 text-text-primary rounded-md transition active:bg-dark-200 hover:bg-dark-300 ${!nodesDraggable ? 'opacity-50' : ''}`}
        title={nodesDraggable ? 'Lock Interactivity' : 'Unlock Interactivity'}
      >
        {nodesDraggable ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>
    </Controls>
  );
}

