const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [result] = await db.query("SELECT id, name, email FROM users");
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    try {
        const [result] = await db.query(sql, [name, email, password]);
        res.json({ message: "User added successfully!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};