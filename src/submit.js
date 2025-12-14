// submit.js
// Enhanced submit button with refined styling from starter kit

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setAlertData(data);
            setShowAlert(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error: Unable to connect to backend. Make sure the backend server is running on http://localhost:8000');
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertData(null);
    };

    return (
        <>
            <div className="flex items-center justify-center px-6 py-4 bg-dark-400/90 backdrop-blur-xl border-t border-dark-200 shadow-sm">
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-teal-500/30"
                >
                    {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>

            {showAlert && alertData && (
                <div className="alert-overlay" onClick={closeAlert}>
                    <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="alert-title">Pipeline Analysis</h2>
                        <div className="alert-content">
                            <div className="alert-stat">
                                <span className="alert-label">Number of Nodes:</span>
                                <span className="alert-value">{alertData.num_nodes}</span>
                            </div>
                            <div className="alert-stat">
                                <span className="alert-label">Number of Edges:</span>
                                <span className="alert-value">{alertData.num_edges}</span>
                            </div>
                            <div className="alert-stat">
                                <span className="alert-label">Is DAG:</span>
                                <span className={`alert-value ${alertData.is_dag ? 'success' : 'error'}`}>
                                    {alertData.is_dag ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        </div>
                        <button className="alert-close" onClick={closeAlert}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
