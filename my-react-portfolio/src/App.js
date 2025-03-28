import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './styles/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      {/* We'll add more sections one by one */}
    </div>
  );
}

export default App;