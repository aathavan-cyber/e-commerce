import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('emilys'); // Default DummyJSON user
  const [password, setPassword] = useState('emilyspass');
  const { login } = useCart();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data); // Save user data to Context
        localStorage.setItem('token', data.token); // Save token for sessions
        navigate('/'); // Go back to products
      } else {
        alert('Invalid credentials! Try emilys / emilyspass');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign-In</h2>
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="login-btn">Continue</button>
        <p className="login-helper">Demo User: emilys / emilyspass</p>
      </form>
    </div>
  );
};

export default Login;