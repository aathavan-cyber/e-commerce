const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM products');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (results.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const { title, price, description, category, brand, thumbnail } = req.body;
    const sql = "INSERT INTO products (title, price, description, category, brand, thumbnail) VALUES (?, ?, ?, ?, ?, ?)";
    try {
        const [result] = await db.query(sql, [title, price, description, category, brand, thumbnail]);
        res.json({ message: "Product added!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};