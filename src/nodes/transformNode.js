// transformNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Shuffle } from 'lucide-react';

export const TransformNode = ({ id, data, selected }) => {
  const config = {
    title: 'TRANSFORM',
    className: 'transform-node',
    icon: <Shuffle className="w-4 h-4 text-white" />,
    description: 'Transform data using various operations.',
    inputHandles: [
      { id: 'input', position: 'Left' }
    ],
    outputHandles: [
      { id: 'output', position: 'Right' }
    ],
    fields: [
      {
        name: 'operation',
        type: 'select',
        label: 'Operation',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'reverse', label: 'Reverse' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
