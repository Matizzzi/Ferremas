// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.overlay} />
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>
            <span style={styles.titleHighlight}>Soluciones industriales</span> 
            <br />
            para profesionales exigentes
          </h1>
          <p style={styles.subtitle}>
            Más de 10,000 productos de calidad certificada para tus proyectos de construcción y manufactura.
          </p>
          <div style={styles.ctaContainer}>
            <button style={styles.primaryBtn} onClick={() => window.location.href="#productos"}>
              Explorar catálogo
            </button>
            <button style={styles.secondaryBtn} onClick={() => window.location.href="#contacto"}>
              <span style={styles.btnIcon}>📞</span> Contactar asesor
            </button>
          </div>
        </div>
        <div style={styles.badgeContainer}>
          <div style={styles.badge}>
            <span style={styles.badgeIcon}>🏆</span>
            <span>Proveedor certificado desde 1998</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '90vh',
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
    color: 'white',
    padding: '0 5%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(42, 67, 101, 0.85) 0%, rgba(28, 45, 68, 0.9) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  textContainer: {
    maxWidth: '800px',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
    letterSpacing: '-0.5px',
  },
  titleHighlight: {
    color: '#4c7cb8',
    position: 'relative',
    display: 'inline-block',
  },
  subtitle: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    fontWeight: '400',
    maxWidth: '600px',
    opacity: 0.9,
  },
  ctaContainer: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: '#4c7cb8',
    border: 'none',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    transition: 'all 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 15px rgba(76, 124, 184, 0.4)',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '0.9rem 2rem',
    fontSize: '1.1rem',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    transition: 'all 0.3s ease',
  },
  btnIcon: {
    fontSize: '1.2rem',
  },
  badgeContainer: {
    display: 'flex',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '0.8rem 1.5rem',
    borderRadius: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  badgeIcon: {
    fontSize: '1.2rem',
  },
};

// Efectos hover
const hoverEffects = {
  primaryBtn: {
    ':hover': {
      backgroundColor: '#3a6ea5',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(76, 124, 184, 0.6)',
    },
  },
  secondaryBtn: {
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  titleHighlight: {
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: '100%',
      height: '3px',
      backgroundColor: '#4c7cb8',
      borderRadius: '3px',
    },
  },
};

export default Hero;