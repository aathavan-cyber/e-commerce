const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678', 
    database: 'ecom_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- PRODUCT ROUTES ---

app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/products/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(results[0]);
    });
});

app.post('/api/products', (req, res) => {
    const { title, price, description, category, brand, thumbnail } = req.body;
    const sql = "INSERT INTO products (title, price, description, category, brand, thumbnail) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [title, price, description, category, brand, thumbnail], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added!", id: result.insertId });
    });
});

app.delete('/api/products/:id', (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product deleted successfully" });
    });
});

// --- USER ROUTES ---

app.get('/api/users', (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User added successfully!", id: result.insertId });
    });
});

app.delete('/api/users/:id', (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted" });
    });
});

// --- LOGIN ROUTE (ONLY ONE) ---

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // This query now correctly looks for 'email' column
    const sql = 'SELECT id, name, email FROM users WHERE email = ? AND password = ?';
    
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("DATABASE ERROR DURING LOGIN:", err);
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
        
        if (results.length > 0) {
            res.json(results[0]); // Returns { id, name, email }
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

app.post('/api/orders', (req, res) => {
    const { user_id, total_amount, cartItems } = req.body;

    // 1. Insert into 'orders' table
    const orderSql = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
    
    db.query(orderSql, [user_id, total_amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const orderId = result.insertId;

        // 2. Prepare items for bulk insert into 'order_items'
        // Format: [[order_id, product_id, quantity, price], [...]]
        const itemData = cartItems.map(item => [
            orderId, 
            item.id, 
            item.quantity, 
            item.price
        ]);

        const itemsSql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
        
        db.query(itemsSql, [itemData], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Order placed successfully!", orderId });
        });
    });
});

// Get all orders for Admin Dashboard
app.get('/api/orders', (req, res) => {
    const sql = `
        SELECT o.id, u.name AS customer_name, o.total_amount, o.status, o.created_at 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        ORDER BY o.created_at DESC`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fetch orders error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));