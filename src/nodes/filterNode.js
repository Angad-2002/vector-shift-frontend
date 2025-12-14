// filterNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Filter } from 'lucide-react';

export const FilterNode = ({ id, data, selected }) => {
  const config = {
    title: 'FILTER',
    className: 'filter-node',
    icon: <Filter className="w-4 h-4 text-white" />,
    description: 'Filter data by criteria.',
    inputHandles: [
      { id: 'input', position: 'Left' }
    ],
    outputHandles: [
      { id: 'output', position: 'Right' }
    ],
    fields: [
      {
        name: 'filterType',
        type: 'select',
        label: 'Filter Type',
        defaultValue: 'remove_empty',
        options: [
          { value: 'remove_empty', label: 'Remove Empty' },
          { value: 'remove_duplicates', label: 'Remove Duplicates' },
          { value: 'keep_unique', label: 'Keep Unique' }
        ]
      },
      {
        name: 'caseSensitive',
        type: 'checkbox',
        label: 'Case Sensitive',
        defaultValue: false
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
