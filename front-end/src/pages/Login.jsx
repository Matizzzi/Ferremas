import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Sesión iniciada!");
      // Aquí podrías redirigir a otra página
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Entrar</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#2c3e50',
    borderRadius: '10px',
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#e67e22',
    border: 'none',
    padding: '0.8rem',
    borderRadius: '30px',
    fontWeight: '700',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
  error: {
    color: '#ff4d4f',
    marginTop: '0.5rem',
  },
};

export default Login;
