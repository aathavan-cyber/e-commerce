import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import './App.scss';
import Products from './pages/Products/Products';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login'; 
import Checkout from './pages/Checkout/Checkout';
import ProductDetail from './pages/ProductDetail/ProductDetail';

// 1. Create a wrapper component to access location
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* 2. Only show Navbar if we are NOT on the admin page */}
      {location.pathname !== '/admin' && <Navbar />}
      
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;