// llmNode.js
// Updated to use new baseNode structure matching starter kit UI

import { BaseNode } from './baseNode';
import { Brain } from 'lucide-react';

export const LLMNode = ({ id, data, selected }) => {
  const config = {
    title: 'LLM',
    className: 'llm-node',
    icon: <Brain className="w-4 h-4 text-white" />,
    description: 'Large Language Model node for AI-powered text generation.',
    inputHandles: [
      { id: 'system', position: 'Left' },
      { id: 'prompt', position: 'Left' }
    ],
    outputHandles: [
      { id: 'response', position: 'Right' }
    ],
    fields: [
      {
        name: 'model',
        type: 'select',
        label: 'Model',
        defaultValue: 'GPT-4',
        options: [
          { value: 'GPT-4', label: 'GPT-4' },
          { value: 'GPT-3.5', label: 'GPT-3.5' },
          { value: 'Claude', label: 'Claude' },
          { value: 'Llama', label: 'Llama' }
        ]
      },
      {
        name: 'temperature',
        type: 'number',
        label: 'Temperature',
        defaultValue: 0.7,
        min: 0,
        max: 1,
        step: 0.1
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} selected={selected} />;
};
