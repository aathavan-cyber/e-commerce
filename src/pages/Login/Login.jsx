import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Login.scss';

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
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Server error. Please check your connection.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Sign-In</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">Continue</button>
        </form>
        {/* Footer section removed from here */}
      </div>
    </div>
  );
};

export default Login;