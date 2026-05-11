import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';

const Checkout = () => {
  const { cart, clearCart } = useCart(); 
  const [isPaid, setIsPaid] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target);
    
    if (paymentMethod === 'upi') {
      const upi = formData.get('upi-id');
      if (!upi.includes('@')) {
        setError('Invalid UPI ID. Must contain @ (e.g., user@bank)');
        return;
      }
    } else {
      const cardNum = formData.get('card-num');
      const expiry = formData.get('expiry');
      const cvv = formData.get('cvv');

      if (cardNum.replace(/\s/g, '').length < 16) {
        setError('Card number must be 16 digits');
        return;
      }

      const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!expiryRegex.test(expiry)) {
        setError('Expiry must be valid MM/YY');
        return;
      }

      const [month, year] = expiry.split('/').map(num => parseInt(num));
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = parseInt(now.getFullYear().toString().slice(-2));

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setError('This card has expired');
        return;
      }

      if (cvv.length < 3) {
        setError('CVV must be 3 digits');
        return;
      }
    }
    try {
      // 2. Get the logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user || !user.id) {
        setError('Please login to complete your purchase');
        navigate('/login');
        return;
      }

      // 3. Prepare the data for the backend
      const orderData = {
        user_id: user.id,
        total_amount: total,
        cartItems: cart // Array of {id, title, price, quantity, etc}
      };

      // 4. Send the POST request to your server
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // 5. Success! Now update the UI
        setPaidAmount(total);
        setIsPaid(true);
        clearCart();
      } else {
        setError(data.error || 'Failed to save order to database.');
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      setError('Connection error. Could not save order.');
    }
    };

  if (isPaid) {
    return (
      <div className="checkout-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Payment Success!</h1>
          <p>Thank you for your purchase of <strong>${paidAmount.toFixed(2)}</strong>.</p>
          <button className="home-btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePayment}>
        <h2>Checkout</h2>
        
        {error && <div className="validation-error">{error}</div>}

        <div className="order-summary">
          <span>Order Total:</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <div className="payment-selector">
          <label className={paymentMethod === 'upi' ? 'active' : ''}>
            <input type="radio" name="pay" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /> 
            UPI (GPay/PhonePe)
          </label>
          <label className={paymentMethod === 'card' ? 'active' : ''}>
            <input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> 
            Debit/Credit Card
          </label>
        </div>

        {paymentMethod === 'upi' ? (
          <div className="input-group">
            <label>UPI ID</label>
            <input name="upi-id" type="text" placeholder="username@bank" required />
          </div>
        ) : (
          <div className="card-fields">
            <div className="input-group">
              <label>Card Number</label>
              <input name="card-num" type="text" placeholder="1234 5678 9101 1121" maxLength="16" required />
            </div>
            <div className="row">
              <div className="input-group">
                <label>Expiry Date</label>
                <input 
                  name="expiry" 
                  type="text" 
                  placeholder="MM/YY" 
                  maxLength="5" 
                  required 
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                    e.target.value = val;
                  }}
                />
              </div>
              <div className="input-group">
                <label>CVV</label>
                <input name="cvv" type="password" placeholder="123" maxLength="3" required />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="pay-now-btn">Complete Payment</button>
      </form>
    </div>
  );
};

export default Checkout;