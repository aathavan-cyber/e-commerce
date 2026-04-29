const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../products.json'), 'utf8')
    );
    
    const products = data.products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      brand: p.brand,
      thumbnail: p.thumbnail,
      // Convert images array to a comma-separated string for your TEXT column
      images: Array.isArray(p.images) ? p.images.join(',') : p.images,
    }));

    await queryInterface.bulkInsert('products', products, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};