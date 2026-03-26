import React from 'react';
import { motion } from 'framer-motion';
import { Code2, MonitorPlay, Layers } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: <Code2 size={24} className="gradient-text"/>, title: 'Frontend Development', desc: 'Building responsive, performant user interfaces with React, Vue, and modern CSS frameworks.' },
    { icon: <MonitorPlay size={24} className="gradient-text"/>, title: 'UI/UX Design', desc: 'Creating intuitive and engaging user experiences with a focus on aesthetics and usability.' },
    { icon: <Layers size={24} className="gradient-text"/>, title: 'Web Animations', desc: 'Bringing interfaces to life with smooth, purposeful micro-interactions and complex animations.' }
  ];

  return (
    <section id="about" className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About <span className="gradient-text">Me</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Hello! I'm a creative developer with a passion for building beautiful, user-centric digital products. I bridge the gap between design and engineering.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            My goal is to translate complex ideas into elegant, intuitive, and performant web experiences. I constantly explore new web technologies to push the boundaries of what's possible in the browser.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent-1)' }}>5+</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Years Exp.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent-2)' }}>50+</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Projects</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent-3)' }}>100%</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Commitment</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {skills.map((skill, index) => (
            <div key={index} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', transition: 'transform 0.3s' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                {skill.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{skill.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{skill.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
