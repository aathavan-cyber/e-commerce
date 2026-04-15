import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState(''); 
  const { login } = useCart();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please check your connection.');
    }
  };

  return (
  <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Sign-In</h2>
      
      {/* If error is empty, this just stays hidden */}
      {error && <div className="error-message">{error}</div>}
      
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
    </form>
  </div>
);
};

export default Login;