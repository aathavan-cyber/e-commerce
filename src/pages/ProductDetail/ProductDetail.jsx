import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="loading">Loading details...</div>;

  return (
    <div className="detail-container">
      <div className="detail-layout">
        <img src={product.images[0]} alt={product.title} className="detail-image" />
        
        <div className="detail-info">
          <h1>{product.title}</h1>
          <p className="brand">Brand: {product.brand}</p>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="rating">Rating: ⭐ {product.rating}</p>
          
          <div className="actions">
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;