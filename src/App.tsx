import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DummyComponent from './components/Dummy';
import ConnectableDevice from './components/ConnectableDevice';

function App() {
  const [number, setNumber] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DummyComponent number={number} setNumber={setNumber}/>
        <ConnectableDevice />
      </header>
    </div>
  );
}

export default App;
