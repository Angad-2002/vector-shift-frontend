// inputNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { ArrowRight } from 'lucide-react';

export const InputNode = ({ id, data, selected }) => {
  const config = {
    title: 'INPUT',
    className: 'input-node',
    icon: <ArrowRight className="w-4 h-4 text-white" />,
    outputHandles: [
      { id: 'value', position: 'Right' }
    ],
    fields: [
      {
        name: 'inputName',
        type: 'text',
        label: 'Name',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    description: 'Input node for receiving data into the pipeline.'
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
