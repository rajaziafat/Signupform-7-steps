// SignupModal.js
import React from 'react';

const SignupModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {/* Your signup form here */}
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2">Close</button>
      </div>
    </div>
  );
};

export default SignupModal;
