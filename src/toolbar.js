// toolbar.js
// Enhanced left sidebar with refined styling from starter kit

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
  Split 
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

export const PipelineToolbar = () => {
    return (
        <div className="fixed left-4 top-4 bottom-4 w-64 bg-dark-400/95 backdrop-blur-xl border border-dark-200 z-10 flex flex-col shadow-2xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-5 border-b border-dark-200 bg-dark-500/50">
                <h1 className="text-text-primary text-base font-semibold tracking-tight">
                    Pipeline Builder
                </h1>
                <p className="text-text-secondary text-xs mt-1.5 opacity-70">
                    Drag nodes to canvas
                </p>
            </div>

            {/* Node Palette */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
                {nodeConfigs.map(({ type, label, icon: Icon }) => (
                    <DraggableNode
                        key={type}
                        type={type}
                        label={label}
                        icon={Icon}
                    />
                ))}
            </div>

            {/* Footer - Optional branding or info */}
            <div className="px-4 py-3 border-t border-dark-200 bg-dark-500/50">
                <p className="text-text-muted text-xs text-center opacity-50">
                    Available Nodes: {nodeConfigs.length}
                </p>
            </div>
        </div>
    );
};
