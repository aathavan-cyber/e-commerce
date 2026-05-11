const express = require('express');
const cors = require('cors');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Create similarly to products
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Create similarly to products

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));