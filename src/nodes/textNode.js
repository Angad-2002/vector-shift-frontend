// textNode.js
// Rewritten to match chatbot-flow-builder-starter-kit UI design

import { useState, useEffect, useRef } from 'react';
import { Position, useReactFlow } from 'reactflow';
import { useStore } from '../store';
import { FileText } from 'lucide-react';
import CustomHandle from '../components/handles/CustomHandle';

export const TextNode = ({ id, data, selected }) => {
  const { updateNodeField, updateNodeDimensions } = useStore();
  const { deleteElements } = useReactFlow();
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);

  // Extract variables from text (JavaScript variable names in {{ }})
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...text.matchAll(regex)];
    return [...new Set(matches.map(m => m[1].trim()))];
  };

  // Update dimensions based on text content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to measure scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Create a hidden clone to measure text width accurately
      const clone = textareaRef.current.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.height = 'auto';
      clone.style.width = 'auto';
      clone.style.whiteSpace = 'pre';
      clone.style.overflow = 'hidden';
      document.body.appendChild(clone);
      
      // Measure width of longest line
      const lines = currText.split('\n');
      let maxWidth = 0;
      lines.forEach(line => {
        clone.value = line || 'M'; // Use 'M' as minimum
        const lineWidth = clone.scrollWidth;
        if (lineWidth > maxWidth) maxWidth = lineWidth;
      });
      
      document.body.removeChild(clone);
      
      // Calculate dimensions
      // Width: min 256px, max 500px (as per requirements: 250-500px)
      // Add container padding (~64px total: 16px * 2 sides + textarea padding)
      const newWidth = Math.max(256, Math.min(maxWidth + 80, 500));
      
      // Height: min 100px, max 400px (as per requirements: 100-400px)
      // Add header (~36px) + footer (~32px) + section padding (~32px) = ~100px
      const newHeight = Math.max(100, Math.min(scrollHeight + 100, 400));
      
      // Update textarea height (with max constraint for internal scrolling)
      textareaRef.current.style.height = `${Math.max(60, Math.min(scrollHeight + 20, 300))}px`;
      
      // Update node dimensions through the store
      updateNodeDimensions(id, newWidth, newHeight);
    }
  }, [currText, id, updateNodeDimensions]);

  // Update variables when text changes
  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const isEmpty = (str) => !str || str.trim() === '';

  return (
    <div 
      ref={nodeRef}
      data-selected={selected}
      className={`overflow-hidden border border-dark-200 rounded-xl bg-dark-300/50 shadow-sm backdrop-blur-xl transition divide-y divide-dark-200 ${selected ? 'border-teal-600 ring-1 ring-teal-600/50' : ''}`}
      style={{ 
        width: '100%',
        minWidth: '256px',
        maxWidth: '500px',
        transition: 'width 0.2s ease, height 0.2s ease',
      }}
    >
      {/* Header Section */}
      <div className="relative bg-dark-300/50">
        <div className="absolute inset-0">
          <div className="absolute h-full w-3/5 from-teal-900/20 to-transparent bg-gradient-to-r" />
        </div>

        <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
          <div className="flex grow items-center pl-0.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="ml-1 text-xs font-medium leading-none tracking-wide uppercase opacity-80">
              <span className="translate-y-px">
                TEXT
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:border-dark-200 active:bg-dark-400/50 hover:bg-dark-100"
              onClick={() => deleteElements({ nodes: [{ id }] })}
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col divide-y divide-dark-200">
        {/* Message Content Section */}
        <div className="flex flex-col p-4">
          <div className="text-xs text-light-900/50 font-medium mb-2">
            Text Content
          </div>

          <div className="mt-2">
            <textarea
              ref={textareaRef}
              value={currText}
              onChange={handleTextChange}
              placeholder="Enter text with variables like {{varName}}"
              className="w-full px-2.5 py-1.5 text-sm bg-dark-300/50 border border-dark-200 rounded-md text-light-900 placeholder-light-900/40 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/50 resize-none"
              style={{
                minHeight: '60px',
                maxHeight: '340px',
                height: 'auto',
                fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
                lineHeight: '1.5',
                overflowY: 'auto'
              }}
            />
          </div>

          {variables.length > 0 && (
            <div className="mt-3 px-2.5 py-1.5 bg-teal-900/10 border border-teal-600/20 rounded-md">
              <div className="text-xs text-light-900/60 font-mono">
                Variables: {variables.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        {isEmpty(currText) && (
          <div className="px-4 py-2">
            <div className="text-xs text-light-900/50 italic">
              No text content yet...
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

      {/* Dynamic input handles for variables */}
      {variables.map((variable, index) => (
        <CustomHandle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="w-3 h-3 rounded-full bg-teal-500 border-2 border-dark-300 shadow-lg hover:w-4 hover:h-4 hover:bg-teal-400"
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`
          }}
          isConnectable={true}
        />
      ))}

      {/* Output Handle */}
      <CustomHandle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 rounded-full bg-teal-500 border-2 border-dark-300 shadow-lg hover:w-4 hover:h-4 hover:bg-teal-400"
        isConnectable={true}
      />
    </div>
  );
};
