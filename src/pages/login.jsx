// src/pages/login.tsx
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br /> 
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;