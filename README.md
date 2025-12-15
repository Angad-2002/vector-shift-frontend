# Frontend - VectorShift Pipeline Builder

React-based frontend application for building and visualizing data processing pipelines.

## Overview

This frontend application provides a visual interface for creating node-based pipelines. Users can drag and drop nodes, connect them with edges, and submit pipelines for analysis. The application features a modern dark theme with a responsive design.

## Features

### Part 1: Node Abstraction
- **BaseNode Component**: Flexible, reusable abstraction for creating nodes
- **Configuration-Based Nodes**: Nodes defined through simple configuration objects
- **Five New Node Types**: Conditional, Transform, Filter, Merge, and Split nodes
- **Extensible Design**: Easy to add new node types

### Part 2: Styling
- **Modern Dark Theme**: Professional dark UI with gradient backgrounds
- **Consistent Design System**: Unified styling across all components
- **Responsive Layout**: Works on different screen sizes
- **Interactive Elements**: Hover effects, transitions, and visual feedback

### Part 3: Text Node Logic
- **Dynamic Sizing**: Automatically adjusts width (256-500px) and height (100-400px) based on content
- **Variable Detection**: Detects JavaScript variable names in `{{variableName}}` format
- **Dynamic Handles**: Creates input handles for each detected variable
- **Real-time Updates**: Variables and handles update as the user types

### Part 4: Backend Integration
- **Pipeline Submission**: Sends nodes and edges to backend API
- **User-Friendly Alerts**: Modal dialog displays analysis results

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. The application will open at `http://localhost:3000`

3. Make sure the backend server is running on `http://localhost:8000` (see backend README)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CustomControls.js          # Zoom and control buttons
│   │   ├── CustomDropdown.js          # Styled dropdown component
│   │   ├── edges/
│   │   │   └── CustomDeletableEdge.js # Deletable edge component
│   │   ├── handles/
│   │   │   └── CustomHandle.js        # Custom connection handles
│   │   └── FlowContent.js             # Main flow content wrapper
│   ├── nodes/
│   │   ├── baseNode.js                # Core node abstraction
│   │   ├── inputNode.js               # Input node
│   │   ├── outputNode.js              # Output node
│   │   ├── llmNode.js                 # LLM node
│   │   ├── textNode.js                # Text node with variable detection
│   │   ├── conditionalNode.js        # Conditional node
│   │   ├── transformNode.js           # Transform node
│   │   ├── filterNode.js              # Filter node
│   │   ├── mergeNode.js               # Merge node
│   │   └── splitNode.js              # Split node
│   ├── hooks/
│   │   └── useNodeAutoAdjust.js       # Hook for auto-adjusting nodes
│   ├── utils/
│   │   └── cn.js                      # Utility functions
│   ├── App.js                         # Main app component
│   ├── App.css                        # Global styles
│   ├── index.js                       # Entry point
│   ├── index.css                      # Base styles
│   ├── store.js                       # Zustand state management
│   ├── ui.js                          # Pipeline UI component
│   ├── toolbar.js                     # Toolbar component
│   ├── submit.js                      # Submit button component
│   └── draggableNode.js               # Draggable node component
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tailwind.config.js                 # Tailwind configuration
└── postcss.config.js                  # PostCSS configuration
```

## Technologies

- **React** (v18.2.0) - UI framework
- **ReactFlow** (v11.8.3) - Node-based flow editor
- **Zustand** (v4.4.1) - State management
- **Tailwind CSS** (v3.4.0) - Utility-first CSS framework
- **Lucide React** (v0.561.0) - Icon library
- **Radix UI** - Accessible component primitives

## Usage

1. **Adding Nodes**: Click and drag nodes from the left toolbar onto the canvas
2. **Connecting Nodes**: Click and drag from an output handle (right side) to an input handle (left side)
3. **Editing Nodes**: Click on a node to select it and edit its fields
4. **Text Node Variables**: Type text with variables like `{{input}}` or `{{userName}}` to create dynamic input handles
5. **Submitting Pipeline**: Click the "Submit Pipeline" button (send icon) in the toolbar to analyze your pipeline
6. **Viewing Results**: A modal will display the number of nodes, edges, and whether the pipeline is a DAG

## Implementation Details

### Node Abstraction

The `BaseNode` component provides a flexible abstraction for creating nodes. Each node is defined through a configuration object:

```javascript
const config = {
  title: 'TRANSFORM',
  className: 'transform-node',
  icon: <Shuffle className="w-4 h-4 text-white" />,
  inputHandles: [{ id: 'input', position: 'Left' }],
  outputHandles: [{ id: 'output', position: 'Right' }],
  fields: [
    {
      name: 'operation',
      type: 'select',
      label: 'Operation',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' }
      ]
    }
  ]
};
```

### Text Node Dynamic Sizing

The Text node implements:
- **Dynamic Width Calculation**: Measures text width and adjusts node width (256-500px range)
- **Dynamic Height Calculation**: Measures text height and adjusts node height (100-400px range)
- **Variable Extraction**: Uses regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g` to find valid JavaScript variable names
- **Dynamic Handle Creation**: Creates input handles for each unique variable found

### Backend Integration

The frontend sends POST requests to `http://localhost:8000/pipelines/parse` with nodes and edges in the request body. Results are displayed in a modal dialog.

## Available Scripts

- `npm start` - Start the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for complex animations and overrides
- **Dark Theme** with gradient backgrounds and glassmorphism effects
- **Consistent Color Palette** defined in Tailwind config

## Development

The application uses ReactFlow for the node-based editor and Zustand for state management. All node types extend the BaseNode component, making it easy to add new node types.

