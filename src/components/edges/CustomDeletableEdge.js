// CustomDeletableEdge.js
// Custom edge component with delete button, matching starter kit design

import { BezierEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from 'reactflow';

export default function CustomDeletableEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

  const { setEdges } = useReactFlow();

  const [
    _,
    labelX,
    labelY,
  ] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <button
          type="button"
          className="group pointer-events-auto absolute w-5 h-5 flex items-center justify-center rounded-full transition-colors transition-shadow"
          style={{
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
            backgroundColor: 'var(--dark-500)',
            color: '#fca5a5', // red-300
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--dark-200)';
            e.target.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--dark-500)';
            e.target.style.boxShadow = 'none';
          }}
          onClick={() => setEdges(edges => edges.filter(edge => edge.id !== id))}
        >
          <svg 
            className="w-3 h-3 transition" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{
              transition: 'transform 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(0.8)';
              e.target.style.color = '#fef2f2'; // red-50
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.color = 'currentColor';
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

