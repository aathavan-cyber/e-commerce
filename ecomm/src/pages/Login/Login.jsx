import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Login.scss';

const Login = () => {
  // 1. Change 'username' to 'email' and clear defaults
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { login } = useCart();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
        const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 2. Send 'email' instead of 'username' to match your backend/DB
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        // Show the specific error message from your backend if available
        setError(data.message || 'Invalid email or password.');
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
            <label>Email</label> {/* 3. Update Label */}
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
      </div>
    </div>
  );
};

export default Login;