import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Left Sidebar */}
      <PipelineToolbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Canvas Area */}
        <div className="flex-1 relative">
          <PipelineUI />
        </div>
        
        {/* Submit Button Footer */}
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
