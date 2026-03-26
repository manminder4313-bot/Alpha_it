import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';

const Projects = () => {
  const projects = [
    { title: 'E-commerce Platform', desc: 'A full-stack e-commerce solution with dynamic cart, checkout, and sleek animations.', tags: ['React', 'Node.js', 'Stripe'], image: 'https://images.unsplash.com/photo-1557821552-17105153ce67?q=80&w=1000&auto=format&fit=crop' },
    { title: 'AI Dashboard', desc: 'Data visualization dashboard for AI model metrics with real-time updates.', tags: ['Vue.js', 'D3.js', 'Firebase'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Fintech Mobile App', desc: 'A cross-platform app for managing personal finances easily and securely.', tags: ['React Native', 'TypeScript', 'Redux'], image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Web3 NFT Marketplace', desc: 'Decentralized application for minting and trading digital assets.', tags: ['Next.js', 'Solidity', 'Web3.js'], image: 'https://images.unsplash.com/photo-1620321023713-e4d6da258296?q=80&w=1000&auto=format&fit=crop' }
  ];

  return (
    <section id="projects" className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Featured <span className="gradient-text">Projects</span></h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>A selection of my recent work and explorations.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="project-img" />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>{project.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: 'var(--accent-1)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }} className="project-link">
                    <Globe size={16} /> Code
                  </a>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }} className="project-link">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <style>{`
        .glass-panel:hover .project-img { transform: scale(1.05); }
        .project-link:hover { color: var(--accent-1) !important; }
      `}</style>
    </section>
  );
};

export default Projects;
