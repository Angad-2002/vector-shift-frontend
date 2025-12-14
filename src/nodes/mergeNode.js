// mergeNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Merge } from 'lucide-react';

export const MergeNode = ({ id, data, selected }) => {
  const config = {
    title: 'MERGE',
    className: 'merge-node',
    icon: <Merge className="w-4 h-4 text-white" />,
    description: 'Merge multiple inputs into a single output.',
    inputHandles: [
      { id: 'input1', position: 'Left', style: { top: '25%' } },
      { id: 'input2', position: 'Left', style: { top: '50%' } },
      { id: 'input3', position: 'Left', style: { top: '75%' } }
    ],
    outputHandles: [
      { id: 'output', position: 'Right' }
    ],
    fields: [
      {
        name: 'mergeStrategy',
        type: 'select',
        label: 'Strategy',
        defaultValue: 'concat',
        options: [
          { value: 'concat', label: 'Concatenate' },
          { value: 'join', label: 'Join with Separator' },
          { value: 'array', label: 'Create Array' }
        ]
      },
      {
        name: 'separator',
        type: 'text',
        label: 'Separator',
        defaultValue: ' ',
        placeholder: 'e.g., space, comma'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
