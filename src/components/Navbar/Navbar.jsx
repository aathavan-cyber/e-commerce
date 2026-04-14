import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import './Navbar.css';


const Navbar = () => {
  const { cart, user, logout } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MiniAmazon</Link>
      <div className="nav-links">
        {user ? (
          <span className="nav-user" onClick={logout}>Hello, {user.firstName} (Logout)</span>
        ) : (
          <Link to="/login" className="nav-item">Login</Link>
        )}
        <Link to="/cart" className="nav-cart">
          Cart <span className="cart-badge">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;