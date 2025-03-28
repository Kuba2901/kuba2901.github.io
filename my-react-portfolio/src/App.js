import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import './styles/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Import AOS (Animate On Scroll) if you're using it
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // Initialize AOS if you're using it
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      {/* We'll add more sections one by one */}
    </div>
  );
}

export default App;