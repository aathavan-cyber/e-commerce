import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.scss';

const Cart = () => {
  const { cart, user, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    user ? navigate('/checkout') : navigate('/login');
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart feels a bit light.</p>
          <Link to="/" className="shop-link">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">${Number(item.price).toFixed(2)}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="item-total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              className="checkout-btn" 
              onClick={handleCheckoutClick}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;