import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="products-container">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.thumbnail} alt={item.title} className="product-image" />
            <div className="product-info">
              <h4 className="product-title">{item.title}</h4>
              <p className="product-price">${item.price}</p>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;