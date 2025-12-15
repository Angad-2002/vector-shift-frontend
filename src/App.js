import { PipelineUI } from './ui';
import './App.css';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Area */}
        <div className="flex-1 relative">
          <PipelineUI />
        </div>
      </div>
    </div>
  );
}

export default App;
