// baseNode.js
// Completely rewritten to match chatbot-flow-builder-starter-kit UI design

import { useState } from 'react';
import { Position, useReactFlow } from 'reactflow';
import { useStore } from '../store';
import { Trash2 } from 'lucide-react';
import CustomDropdown from '../components/CustomDropdown';
import CustomHandle from '../components/handles/CustomHandle';

// Icon components for different node types
const getNodeIcon = (nodeType) => {
  const iconMap = {
    'input-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    'output-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    'llm-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'conditional-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    'transform-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'filter-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
    'merge-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'split-node': (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  };
  
  return iconMap[nodeType] || (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
};

// Get gradient color based on node type
const getGradientColor = (nodeType) => {
  const gradientMap = {
    'input-node': 'from-teal-900/20',
    'output-node': 'from-red-900/20',
    'llm-node': 'from-purple-900/20',
    'conditional-node': 'from-purple-900/20',
    'transform-node': 'from-cyan-900/20',
    'filter-node': 'from-pink-900/20',
    'merge-node': 'from-teal-900/20',
    'split-node': 'from-purple-900/20',
  };
  return gradientMap[nodeType] || 'from-teal-900/20';
};

// Get border color for selected state
const getSelectedBorderColor = (nodeType) => {
  if (nodeType === 'conditional-node') {
    return 'border-purple-600 ring-purple-600/50';
  }
  return 'border-teal-600 ring-teal-600/50';
};

export const BaseNode = ({ id, data, config, selected }) => {
  const { updateNodeField } = useStore();
  const { deleteElements } = useReactFlow();
  
  // Initialize state for all fields defined in config
  const [fieldStates, setFieldStates] = useState(() => {
    const initialState = {};
    if (config.fields) {
      config.fields.forEach(field => {
        initialState[field.name] = data?.[field.name] || field.defaultValue || '';
      });
    }
    return initialState;
  });

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    setFieldStates(prev => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  // Handle delete
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  // Render a field based on its type
  const renderField = (field) => {
    const value = fieldStates[field.name];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-2.5 py-1.5 text-sm bg-dark-300/50 border border-dark-200 rounded-md text-light-900 placeholder-light-900/40 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/50"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-2.5 py-1.5 text-sm bg-dark-300/50 border border-dark-200 rounded-md text-light-900 placeholder-light-900/40 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/50 resize-none"
            rows={field.rows || 3}
          />
        );
      
      case 'select':
        return (
          <CustomDropdown
            value={value}
            onChange={(newValue) => handleFieldChange(field.name, newValue)}
            options={field.options}
            placeholder={field.placeholder || 'Select...'}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            className="w-full px-2.5 py-1.5 text-sm bg-dark-300/50 border border-dark-200 rounded-md text-light-900 placeholder-light-900/40 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/50"
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className="w-4 h-4 accent-teal-600"
          />
        );
      
      default:
        return null;
    }
  };

  const nodeType = config.className || '';
  const gradientColor = getGradientColor(nodeType);
  const selectedBorder = getSelectedBorderColor(nodeType);

  return (
    <div 
      data-selected={selected}
      className={`w-64 overflow-hidden border border-dark-200 rounded-xl bg-dark-300/50 shadow-sm backdrop-blur-xl transition divide-y divide-dark-200 ${selected ? selectedBorder + ' ring-1' : ''}`}
    >
      {/* Header Section */}
      <div className="relative bg-dark-300/50">
        <div className="absolute inset-0">
          <div className={`absolute h-full w-3/5 ${gradientColor} to-transparent bg-gradient-to-r`} />
        </div>

        <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
          <div className="flex grow items-center pl-0.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg">
                {config.icon || getNodeIcon(nodeType)}
              </div>
            </div>

            <div className="ml-1 text-xs font-medium leading-none tracking-wide uppercase opacity-80">
              <span className="translate-y-px">
                {config.title}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
            
            {config.deletable !== false && (
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:border-dark-200 active:bg-dark-400/50 hover:bg-dark-100"
                onClick={handleDelete}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col divide-y divide-dark-200">
        {/* Main Content */}
        {config.content && (
          <div className="flex flex-col p-4">
            {config.content}
          </div>
        )}

        {/* Fields Section */}
        {config.fields && config.fields.length > 0 && (
          <div className="flex flex-col p-4 space-y-3">
            {config.fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <div className="text-xs text-light-900/50 font-medium mb-2">
                  {field.label}
                </div>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}

        {/* Description Section */}
        {config.description && (
          <div className="px-4 py-2">
            <div className="text-xs text-light-900/50">
              {config.description}
            </div>
          </div>
        )}

        {/* Node ID Footer */}
        <div className="bg-dark-300/30 px-4 py-2 text-xs text-light-900/50">
          Node:
          {' '}
          <span className="text-light-900/60 font-semibold">
            #
            {id}
          </span>
        </div>
      </div>

      {/* Handles */}
      {config.inputHandles && config.inputHandles.map((handle, index) => (
        <CustomHandle
          key={`input-${handle.id || index}`}
          type="target"
          position={Position[handle.position || 'Left']}
          id={`${id}-${handle.id || index}`}
          style={handle.style || (config.inputHandles.length > 1 ? { top: `${(index + 1) * 100 / (config.inputHandles.length + 1)}%` } : {})}
          isConnectable={handle.isConnectable !== undefined ? handle.isConnectable : true}
        />
      ))}

      {config.outputHandles && config.outputHandles.map((handle, index) => (
        <CustomHandle
          key={`output-${handle.id || index}`}
          type="source"
          position={Position[handle.position || 'Right']}
          id={`${id}-${handle.id || index}`}
          style={handle.style || (config.outputHandles.length > 1 ? { top: `${(index + 1) * 100 / (config.outputHandles.length + 1)}%` } : {})}
          isConnectable={handle.isConnectable !== undefined ? handle.isConnectable : true}
        />
      ))}
    </div>
  );
};
