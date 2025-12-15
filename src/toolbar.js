// toolbar.js
// Enhanced left sidebar with refined styling from starter kit

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { DraggableNode } from './draggableNode';
import { 
  ArrowRight, 
  Brain, 
  Download, 
  FileText, 
  GitBranch, 
  Shuffle, 
  Filter, 
  Merge, 
  Split,
  Send,
  Plus,
  Minus,
  Maximize2,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Settings,
  X
} from 'lucide-react';

const nodeConfigs = [
  { type: 'customInput', label: 'Input', icon: ArrowRight },
  { type: 'llm', label: 'LLM', icon: Brain },
  { type: 'customOutput', label: 'Output', icon: Download },
  { type: 'text', label: 'Text', icon: FileText },
  { type: 'conditional', label: 'Conditional', icon: GitBranch },
  { type: 'transform', label: 'Transform', icon: Shuffle },
  { type: 'filter', label: 'Filter', icon: Filter },
  { type: 'merge', label: 'Merge', icon: Merge },
  { type: 'split', label: 'Split', icon: Split },
];

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const PipelineToolbar = ({ 
    nodesDraggable, 
    nodesConnectable, 
    onNodesDraggableChange, 
    onNodesConnectableChange,
    onZoomIn,
    onZoomOut,
    onFitView,
    minZoomReached,
    maxZoomReached,
    showMiniMap,
    showControlsToolbar,
    onToggleMiniMap,
    onToggleControlsToolbar
}) => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setAlertData(data);
            setShowAlert(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error: Unable to connect to backend. Make sure the backend server is running on http://localhost:8000');
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertData(null);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

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
        <>
            {/* Left Sidebar - Node Components and Submit */}
            {isCollapsed ? (
                <div className="fixed left-4 top-4 z-10">
                    <button
                        onClick={toggleCollapse}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-400/95 backdrop-blur-xl border border-dark-200 text-teal-500 hover:bg-dark-300 hover:border-teal-600/50 transition-all duration-200 shadow-xl"
                        title="Show Toolbar"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="fixed left-4 top-4 w-16 bg-dark-400/95 backdrop-blur-xl border border-dark-200 z-10 flex flex-col items-center shadow-2xl rounded-2xl overflow-hidden py-1.5 max-h-[calc(100vh-2rem)]">
                    {/* Hide Button */}
                    <div className="px-2 pb-1.5 border-b border-dark-200 w-full flex justify-center">
                        <button
                            onClick={toggleCollapse}
                            className="flex items-center justify-center w-7 h-7 rounded-lg bg-dark-300/50 border border-dark-200 text-text-secondary hover:text-teal-500 hover:bg-dark-300 hover:border-teal-600/50 transition-all duration-200"
                            title="Hide Toolbar"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Node Icons */}
                    <div className="flex flex-col gap-1.5 items-center justify-start px-2 py-1.5">
                        {nodeConfigs.map(({ type, label, icon: Icon }) => (
                            <DraggableNode
                                key={type}
                                type={type}
                                label={label}
                                icon={Icon}
                                iconOnly
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="border-t border-dark-200 pt-1.5 px-2 pb-1.5">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-teal-500 text-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-teal-600/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-teal-500/30 mb-1.5"
                            title={isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                        >
                            <Send className="w-4 h-4" />
                        </button>

                        {/* Settings Button */}
                        <button
                            type="button"
                            onClick={() => setShowSettings(true)}
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-dark-300/50 border border-dark-200 text-text-secondary hover:text-teal-500 hover:bg-dark-300 hover:border-teal-600/50 transition-all duration-200"
                            title="Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Top Right - Zoom and Lock Controls */}
            {showControlsToolbar && (
            <div className="fixed right-4 top-4 bg-dark-400/95 backdrop-blur-xl border border-dark-200 z-10 flex flex-col items-center gap-1.5 shadow-2xl rounded-2xl px-2 py-2">
                    <button
                        type="button"
                        onClick={onZoomIn}
                        disabled={maxZoomReached}
                    className="flex items-center justify-center w-8 h-8 text-text-primary hover:text-teal-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Zoom In"
                    >
                        <Plus className="w-4 h-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onZoomOut}
                        disabled={minZoomReached}
                    className="flex items-center justify-center w-8 h-8 text-text-primary hover:text-teal-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Zoom Out"
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onFitView}
                    className="flex items-center justify-center w-8 h-8 text-text-primary hover:text-teal-500 transition-all duration-200"
                        title="Fit View"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                        type="button"
                        onClick={toggleInteractivity}
                    className="flex items-center justify-center w-8 h-8 text-text-primary hover:text-teal-500 transition-all duration-200"
                        title={nodesDraggable ? 'Lock Nodes' : 'Unlock Nodes'}
                    >
                        {nodesDraggable ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
            </div>
            )}

            {showAlert && alertData && (
                <div className="alert-overlay" onClick={closeAlert}>
                    <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="alert-title">Pipeline Analysis</h2>
                        <div className="alert-content">
                            <div className="alert-stat">
                                <span className="alert-label">Number of Nodes:</span>
                                <span className="alert-value">{alertData.num_nodes}</span>
                            </div>
                            <div className="alert-stat">
                                <span className="alert-label">Number of Edges:</span>
                                <span className="alert-value">{alertData.num_edges}</span>
                            </div>
                            <div className="alert-stat">
                                <span className="alert-label">Is DAG:</span>
                                <span className={`alert-value ${alertData.is_dag ? 'success' : 'error'}`}>
                                    {alertData.is_dag ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        </div>
                        <button className="alert-close" onClick={closeAlert}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Settings Dialog */}
            {showSettings && (
                <div className="alert-overlay" onClick={() => setShowSettings(false)}>
                    <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="alert-title m-0">Display Settings</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-dark-300/50 border border-dark-200 text-text-secondary hover:text-teal-500 hover:bg-dark-300 hover:border-teal-600/50 transition-all duration-200"
                                title="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="alert-content">
                            <div className="flex items-center justify-between py-3 border-b border-dark-200">
                                <div>
                                    <div className="text-text-primary font-medium mb-1">Controls Toolbar</div>
                                    <div className="text-text-secondary text-sm">Show zoom and lock controls</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showControlsToolbar}
                                        onChange={(e) => onToggleControlsToolbar(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <div className="text-text-primary font-medium mb-1">Mini Map</div>
                                    <div className="text-text-secondary text-sm">Show pipeline overview</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showMiniMap}
                                        onChange={(e) => onToggleMiniMap(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
