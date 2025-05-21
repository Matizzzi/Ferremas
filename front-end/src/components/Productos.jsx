import React, { useEffect, useState } from 'react';
import { ferremasApi } from '../api/ferremasApi';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await ferremasApi.getProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al traer los productos:', error);
        setError('No pudimos cargar los productos. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Cargando productos...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <div style={styles.errorIcon}>⚠️</div>
      <p style={styles.errorText}>{error}</p>
      <button 
        style={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        Reintentar
      </button>
    </div>
  );

  if (productos.length === 0) return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>📦</div>
      <h3 style={styles.emptyTitle}>No hay productos disponibles</h3>
      <p style={styles.emptyText}>Pronto tendremos nuevos productos en stock</p>
    </div>
  );

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Nuestros Productos</h2>
        <p style={styles.subtitle}>Calidad garantizada para tus proyectos</p>
      </div>
      
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Categoría:</label>
          <select style={styles.filterSelect}>
            <option>Todas</option>
            <option>Herramientas</option>
            <option>Materiales</option>
            <option>Equipos</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Ordenar por:</label>
          <select style={styles.filterSelect}>
            <option>Recomendados</option>
            <option>Precio: menor a mayor</option>
            <option>Precio: mayor a menor</option>
            <option>Novedades</option>
          </select>
        </div>
      </div>

      <div style={styles.grid}>
        {productos.map((producto) => (
          <div key={producto.id} style={styles.card}>
            <div style={styles.cardImageContainer}>
              <div style={styles.cardImage}></div>
              {producto.oferta && <span style={styles.badge}>OFERTA</span>}
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{producto.nombre}</h3>
              <p style={styles.cardDescription}>{producto.descripcion}</p>
              <div style={styles.cardFooter}>
                <span style={styles.cardPrice}>${producto.precio?.toLocaleString() || 'N/A'}</span>
                <button style={styles.cardButton}>
                  <span style={styles.cardButtonIcon}>🛒</span>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '3rem auto',
    padding: '0 1.5rem',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#2a4365',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#718096',
    fontWeight: '400',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  filterLabel: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  filterSelect: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    backgroundColor: 'white',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  cardImageContainer: {
    position: 'relative',
    height: '180px',
    backgroundColor: '#edf2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '60%',
    height: '60%',
    backgroundColor: '#cbd5e0',
    borderRadius: '4px',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#e53e3e',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  cardContent: {
    padding: '1.25rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 0.5rem 0',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#718096',
    lineHeight: '1.5',
    margin: '0 0 1rem 0',
    minHeight: '60px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2a4365',
  },
  cardButton: {
    backgroundColor: '#4c7cb8',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#3a6ea5',
    },
  },
  cardButtonIcon: {
    fontSize: '1rem',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #4c7cb8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  loadingText: {
    color: '#4a5568',
    fontSize: '1rem',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    textAlign: 'center',
    padding: '2rem',
  },
  errorIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    maxWidth: '500px',
  },
  retryButton: {
    backgroundColor: '#4c7cb8',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#3a6ea5',
    },
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    padding: '2rem',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: '0.7',
  },
  emptyTitle: {
    color: '#2d3748',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: '#718096',
    fontSize: '1rem',
    maxWidth: '500px',
  },
};

export default Productos;