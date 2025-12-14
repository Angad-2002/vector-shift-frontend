// outputNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Download } from 'lucide-react';

export const OutputNode = ({ id, data, selected }) => {
  const config = {
    title: 'OUTPUT',
    className: 'output-node',
    icon: <Download className="w-4 h-4 text-white" />,
    inputHandles: [
      { id: 'value', position: 'Left' }
    ],
    fields: [
      {
        name: 'outputName',
        type: 'text',
        label: 'Name',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ],
    description: 'Output node for sending data out of the pipeline.'
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
