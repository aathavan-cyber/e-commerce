import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, user, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;

    if (!user) {
      navigate('/login'); 
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">${item.price}</p>
                  
                  {}
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, -1)}
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

          <div className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              className="checkout-btn" 
              onClick={handleCheckoutClick}
              disabled={cart.length === 0}
            >
              {cart.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;