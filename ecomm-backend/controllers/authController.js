const db = require('../config/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const sql = 'SELECT id, name, email FROM users WHERE email = ? AND password = ?';
    try {
        const [results] = await db.query(sql, [email, password]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};