// CustomHandle.js
// Custom handle component with proper styling, matching starter kit design

import { getConnectedEdges, Handle, useNodeId, useNodes, useEdges } from 'reactflow';
import { useMemo } from 'react';

export default function CustomHandle({ className, isConnectable, ...props }) {
  const nodes = useNodes();
  const edges = useEdges();
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (!nodeId) { return false; }

    const node = nodes.find(n => n.id === nodeId);
    if (!node) { return false; }

    const connectedEdges = getConnectedEdges([node], edges);

    if (typeof isConnectable === 'function') { 
      return isConnectable({ node, connectedEdges }); 
    }

    if (typeof isConnectable === 'number') { 
      return connectedEdges.length < isConnectable; 
    }

    return isConnectable;
  }, [
    edges,
    isConnectable,
    nodeId,
    nodes,
  ]);

  return (
    <Handle
      className={className}
      isConnectable={isHandleConnectable}
      {...props}
    />
  );
}

