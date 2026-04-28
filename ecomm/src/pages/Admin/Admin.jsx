import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.scss';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]); 
  
  const [newProduct, setNewProduct] = useState({ 
    title: '', price: '', category: '', thumbnail: '', description: '', brand: '' 
  });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch Products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.products || []))
      .catch(err => console.error("Product fetch error:", err));

    // Fetch Users
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("User fetch error:", err);
        setUsers([]);
      });

    fetch('http://localhost:5000/api/orders')
    .then(res => res.json())
    .then(data => setOrders(Array.isArray(data) ? data : []))
    .catch(err => console.error("Orders fetch error:", err));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    }).then(() => {
      fetchData();
      setNewProduct({ title: '', price: '', category: '', thumbnail: '', description: '', brand: '' });
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add user");
      return res.json();
    })
    .then(() => {
      fetchData();
      setNewUser({ name: '', email: '', password: '' });
      alert("User added!");
    })
    .catch(err => alert(err.message));
  };

  const deleteItem = (type, id) => {
    if (window.confirm(`Delete this ${type}?`)) {
      // Logic for /api/products/:id or /api/users/:id
      fetch(`http://localhost:5000/api/${type}s/${id}`, { method: 'DELETE' })
        .then(() => fetchData());
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h2>Admin Management</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Exit Admin</button>
      </header>

      <div className="admin-content">
        {/* PRODUCTS SECTION */}
        <section className="admin-section">
          <h3>Add New Product</h3>
          <form className="admin-form" onSubmit={handleAddProduct}>
            <div className="form-group">
              <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} required />
              <input type="text" placeholder="Brand" value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} />
              <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
              <input type="text" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              <input type="text" placeholder="Image URL" value={newProduct.thumbnail} onChange={e => setNewProduct({...newProduct, thumbnail: e.target.value})} />
              <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <button type="submit" className="submit-btn">Add Product</button>
          </form>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Brand</th><th>Price</th><th>Action</th></tr></thead>
              <tbody>
                {products.length > 0 ? products.map(p => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.brand}</td>
                    <td>${Number(p.price).toFixed(2)}</td>
                    <td><button className="delete-btn" onClick={() => deleteItem('product', p.id)}>Delete</button></td>
                  </tr>
                )) : <tr><td colSpan="4">No products found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        {/* USERS SECTION */}
        <section className="admin-section">
          <h3>User Management</h3>
          
          {/* THE MISSING FORM IS HERE */}
          <form className="admin-form" onSubmit={handleAddUser}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Name" 
                value={newUser.name} 
                onChange={e => setNewUser({...newUser, name: e.target.value})} 
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={newUser.email} 
                onChange={e => setNewUser({...newUser, email: e.target.value})} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={newUser.password} 
                onChange={e => setNewUser({...newUser, password: e.target.value})} 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Add User</button>
          </form>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteItem('user', u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No users found or error loading data.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {/* ORDERS MANAGEMENT SECTION */}
<section className="admin-section">
  <h3>Order History</h3>
  <div className="admin-table-container">
    <table className="admin-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer_name}</td>
              <td>${Number(order.total_amount).toFixed(2)}</td>
              <td>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>
    </div>
    
  );
};

export default Admin;