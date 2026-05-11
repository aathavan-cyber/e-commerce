const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const { user_id, total_amount, cartItems } = req.body;

    try {
        // 1. Insert into 'orders' table
        const orderSql = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
        const [orderResult] = await db.query(orderSql, [user_id, total_amount]);
        const orderId = orderResult.insertId;

        // 2. Prepare items for bulk insert into 'order_items'
        const itemData = cartItems.map(item => [
            orderId, 
            item.id, 
            item.quantity, 
            item.price
        ]);

        const itemsSql = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
        await db.query(itemsSql, [itemData]);

        res.json({ message: "Order placed successfully!", orderId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAdminOrders = async (req, res) => {
    const sql = `
        SELECT o.id, u.name AS customer_name, o.total_amount, o.status, o.created_at 
        FROM orders o 
        JOIN users u ON o.user_id = u.id 
        ORDER BY o.created_at DESC`;

    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (err) {
        console.error("Fetch orders error:", err);
        res.status(500).json({ error: err.message });
    }
};