// App.js
import React, { useState } from 'react';
import SignupModal from './Components/SignupModal';
import './App.css'

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen ">
      <button onClick={() => setShowSignupModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Signup</button>

      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
    </div>
  );
}

export default App;
