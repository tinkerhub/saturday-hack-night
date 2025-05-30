import React from 'react';
import LoopText from './components/LoopText';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Platform</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <LoopText interval={2}>
            <span className="text-blue-600 font-medium">🎉 Welcome to our platform! New features coming soon!</span>
            <span className="text-blue-600 font-medium">✨ Stay tuned for exciting updates!</span>
            <span className="text-blue-600 font-medium">🚀 Join our growing community!</span>
          </LoopText>
        </div>

        <p className="text-gray-600">
          This is a demo of the LoopText component. The text above will automatically cycle through different messages.
        </p>
      </div>
    </div>
  );
}

export default App; 