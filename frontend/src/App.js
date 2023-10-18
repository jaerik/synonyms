import './App.css';
import React from 'react';
import SynonymsForm from './components/SynonymsForm';

function App() {
  return (
    <div className="App">
      <header className="Header">
        Find Synonyms
      </header>
      <main className="Main">
        <SynonymsForm/>
      </main>
    </div>
  );
}

export default App;
