// conditionalNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { GitBranch } from 'lucide-react';

export const ConditionalNode = ({ id, data, selected }) => {
  const config = {
    title: 'CONDITIONAL',
    className: 'conditional-node',
    icon: <GitBranch className="w-4 h-4 text-white" />,
    description: 'Route based on condition. This is a dummy conditional path node. Has no functionality for matching conditions.',
    inputHandles: [
      { id: 'input', position: 'Left' }
    ],
    outputHandles: [
      { id: 'true', position: 'Right', style: { top: '33%' } },
      { id: 'false', position: 'Right', style: { top: '66%' } }
    ],
    fields: [
      {
        name: 'condition',
        type: 'select',
        label: 'Condition',
        defaultValue: 'equals',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' }
        ]
      },
      {
        name: 'value',
        type: 'text',
        label: 'Value',
        defaultValue: '',
        placeholder: 'Comparison value'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
