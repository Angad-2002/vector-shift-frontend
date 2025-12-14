// splitNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Split } from 'lucide-react';

export const SplitNode = ({ id, data, selected }) => {
  const config = {
    title: 'SPLIT',
    className: 'split-node',
    icon: <Split className="w-4 h-4 text-white" />,
    description: 'Split data into parts based on delimiter.',
    inputHandles: [
      { id: 'input', position: 'Left' }
    ],
    outputHandles: [
      { id: 'output1', position: 'Right', style: { top: '33%' } },
      { id: 'output2', position: 'Right', style: { top: '66%' } }
    ],
    fields: [
      {
        name: 'splitBy',
        type: 'select',
        label: 'Split By',
        defaultValue: 'newline',
        options: [
          { value: 'newline', label: 'New Line' },
          { value: 'comma', label: 'Comma' },
          { value: 'space', label: 'Space' },
          { value: 'custom', label: 'Custom' }
        ]
      },
      {
        name: 'delimiter',
        type: 'text',
        label: 'Delimiter',
        defaultValue: '',
        placeholder: 'Custom delimiter'
      },
      {
        name: 'maxSplits',
        type: 'number',
        label: 'Max Splits',
        defaultValue: -1,
        min: -1,
        placeholder: '-1 for unlimited'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
