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
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        // Handle the 'images' field logic
        if (data && typeof data.images === 'string') {
          // Check if it's a JSON stringified array (starts with [)
          if (data.images.startsWith('[')) {
            try {
              data.images = JSON.parse(data.images);
            } catch (e) {
              console.warn("Parsing failed, treating as single URL string");
              data.images = [data.images];
            }
          } else {
            // It's a plain string URL, wrap it in an array
            data.images = [data.images];
          }
        }

        // Final fallback: if images is empty or not an array, use the thumbnail
        if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
          data.images = data.thumbnail ? [data.thumbnail] : [];
        }

        setProduct(data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  if (!product) return <div className="loading">Loading details...</div>;

  return (
    <div className="detail-container">
      <div className="detail-layout">
        {/* We use product.images[0] because we ensured it is an array above */}
        <img 
          src={product.images[0] || product.thumbnail} 
          alt={product.title} 
          className="detail-image" 
        />
        
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