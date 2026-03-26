import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Mail, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <span style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent-1)' }}>
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1.5rem', maxWidth: '800px' }}
        >
          Designing digital <br /> <span className="gradient-text">Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}
        >
          I am a passionate frontend developer specializing in building exceptional digital experiences using modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="#projects" className="btn-primary" style={{ padding: '0.875rem 2rem', background: 'var(--accent-1)', color: '#fff', borderRadius: '2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            View My Work <ArrowRight size={18} />
          </a>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
            <a href="#" className="social-icon"><Globe size={24} /></a>
            <a href="#" className="social-icon"><Mail size={24} /></a>
            <a href="#" className="social-icon"><MessageCircle size={24} /></a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px var(--accent-1);
        }
        .social-icon {
          color: var(--text-secondary);
          transition: color 0.2s, transform 0.2s;
        }
        .social-icon:hover {
          color: var(--text-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default Hero;
