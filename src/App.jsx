import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* This div uses Tailwind classes for styling */}
      <div className="bg-blue-600 text-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4">
          Tailwind is working!
        </h1>
        <p>
          If you can see this box styled correctly, your setup is complete.
        </p>
      </div>
    </div>
  );
}

export default App;
