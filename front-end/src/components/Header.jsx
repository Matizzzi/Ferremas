import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <div style={styles.logo}>FERREMAS</div>
        <div style={styles.logoSubtitle}>Soluciones industriales</div>
      </div>
      
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li><a href="#productos" style={styles.navLink}>Productos</a></li>
          <li><a href="#servicios" style={styles.navLink}>Servicios</a></li>
          <li><a href="#nosotros" style={styles.navLink}>Nosotros</a></li>
          <li><a href="#blog" style={styles.navLink}>Blog</a></li>
          <li><a href="#contacto" style={styles.navLink}>Contacto</a></li>
        </ul>
      </nav>

      <div style={styles.actions}>
        <Link to="/login" style={{ ...styles.loginBtn, textDecoration: 'none' }}>Iniciar sesión</Link>
        <Link to="/register" style={{ ...styles.registerBtn, textDecoration: 'none' }}>Registrarse</Link>
        <button style={styles.contactBtn}>
          <span style={styles.contactIcon} role="img" aria-label="telefono">📞</span> Contáctanos
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 5%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    fontFamily: "'Inter', sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    fontWeight: '800',
    fontSize: '1.8rem',
    color: '#2a4365',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    userSelect: 'none',
    background: 'linear-gradient(90deg, #2a4365 0%, #4c7cb8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoSubtitle: {
    fontSize: '0.7rem',
    color: '#718096',
    fontWeight: '500',
    letterSpacing: '1px',
    marginTop: '0.2rem',
  },
  nav: {
    flexGrow: 1,
    margin: '0 3rem',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '2.5rem',
    justifyContent: 'center',
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    position: 'relative',
    padding: '0.5rem 0',
    transition: 'all 0.3s ease',
  },
  navLinkHover: {
    color: '#2a4365',
  },
  navLinkActive: {
    color: '#2a4365',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  contactBtn: {
    backgroundColor: '#2a4365',
    border: 'none',
    padding: '0.7rem 1.5rem',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease, transform 0.2s ease',
    boxShadow: '0 2px 5px rgba(42, 67, 101, 0.2)',
  },
  contactIcon: {
    fontSize: '1rem',
  },
  loginBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e0',
    padding: '0.6rem 1.3rem',
    color: '#4a5568',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  },
  registerBtn: {
    backgroundColor: '#4c7cb8',
    border: 'none',
    padding: '0.6rem 1.3rem',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease, transform 0.2s ease',
  },
};

// Efectos hover (puedes implementarlos con :hover en CSS o con estados en React)
const hoverEffects = {
  contactBtn: {
    ':hover': {
      backgroundColor: '#1e365b',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(42, 67, 101, 0.3)',
    },
  },
  loginBtn: {
    ':hover': {
      backgroundColor: '#f7fafc',
      borderColor: '#a0aec0',
      color: '#2a4365',
    },
  },
  registerBtn: {
    ':hover': {
      backgroundColor: '#3a6ea5',
      transform: 'translateY(-2px)',
    },
  },
  navLink: {
    ':hover': {
      color: '#2a4365',
    },
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '0',
      height: '2px',
      backgroundColor: '#2a4365',
      transition: 'width 0.3s ease',
    },
    ':hover:after': {
      width: '100%',
    },
  },
};

export default Header;