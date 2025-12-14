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
        <div className="fixed left-4 top-4 bottom-4 w-20 bg-dark-400/95 backdrop-blur-xl border border-dark-200 z-10 flex flex-col items-center justify-center gap-2 shadow-2xl rounded-2xl overflow-hidden p-2">
            {/* Node Icons */}
            <div className="flex flex-col gap-2 items-center">
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
        </div>
    );
};
