const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'ecom_db'
});

// Load your JSON file
const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));

data.products.forEach(p => {
    const query = `INSERT INTO products 
    (id, title, description, category, price, discountPercentage, rating, stock, brand, thumbnail, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // We join the images array into a string so it fits in a TEXT column
    const values = [
        p.id, p.title, p.description, p.category, p.price, 
        p.discountPercentage, p.rating, p.stock, p.brand, 
        p.thumbnail, p.images.join(',') 
    ];

    db.query(query, values, (err) => {
        if (err) console.error(`Error inserting ID ${p.id}:`, err);
        else console.log(`Inserted: ${p.title}`);
    });
});