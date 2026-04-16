import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import './Navbar.scss';

const Navbar = () => {
  const { cart, user, logout } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Ecomm</Link>
      
      <div className="nav-links">
        {user ? (
          <div className="user-section">
            <span className="nav-welcome">Hello, {user.firstName}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="nav-item">Login</Link>
        )}
        
        <Link to="/cart" className="nav-cart">
          {}
          Cart <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;