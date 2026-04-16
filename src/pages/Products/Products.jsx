import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Added for navigation
import { useCart } from '../../context/CartContext';
import './Products.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Added search state
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  // Logic: Filter products dynamically as user types
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="search-header">
        <h2>Featured Products</h2>
        {/* Search Input Field */}
        <input 
          type="text" 
          placeholder="Search products..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="product-card">
              {/* Wrap image/title in Link to go to Detail Page */}
              <Link to={`/product/${item.id}`} className="product-link">
                <img src={item.thumbnail} alt={item.title} className="product-image" />
                <h4 className="product-title">{item.title}</h4>
              </Link>
              
              <div className="product-info">
                <p className="product-price">${item.price}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Products;