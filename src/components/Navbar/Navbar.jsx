import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Ecomm</Link>
      <Link to="/cart" className="nav-cart">
        Cart <span className="cart-badge">{cart.length}</span>
      </Link>
    </nav>
  );
};

export default Navbar;