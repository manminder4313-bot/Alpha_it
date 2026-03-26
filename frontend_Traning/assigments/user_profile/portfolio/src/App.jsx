import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="glow" style={{ top: '-20%', left: '-10%' }}></div>
      <div className="glow" style={{ bottom: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, rgba(0, 0, 0, 0) 70%)' }}></div>
      <div className="glow" style={{ top: '40%', right: '-10%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)' }}></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>© {new Date().getFullYear()} DevFolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
