import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API here. 
    // For now, we just flip the state to show success.
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="checkout-container">
        <div className="success-card">
          <h1>Payment Success!</h1>
          <p>Your order for ${total.toFixed(2)} has been placed.</p>
          <button onClick={() => window.location.href = '/'}>Back to Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePayment}>
        <h2>Checkout</h2>
        <p className="order-total">Total Amount: <strong>${total.toFixed(2)}</strong></p>
        
        <div className="payment-options">
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="upi" 
              checked={paymentMethod === 'upi'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            /> UPI (GPay, PhonePe)
          </label>
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="credit" 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            /> Credit Card
          </label>
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="debit" 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            /> Debit Card
          </label>
        </div>

        {paymentMethod === 'upi' ? (
          <input type="text" placeholder="Enter UPI ID (e.g., user@okaxis)" required />
        ) : (
          <div className="card-fields">
            <input type="text" placeholder="Card Number" required />
            <div className="expiry-cvv">
              <input type="text" placeholder="MM/YY" required />
              <input type="password" placeholder="CVV" required />
            </div>
          </div>
        )}

        <button type="submit" className="pay-now-btn">Pay Now</button>
      </form>
    </div>
  );
};

export default Checkout;