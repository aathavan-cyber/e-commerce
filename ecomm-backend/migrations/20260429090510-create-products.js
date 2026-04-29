module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      images: { type: Sequelize.TEXT },
      brand: { type: Sequelize.STRING(100) },
      price: { type: Sequelize.DECIMAL(10, 2) },
      rating: { type: Sequelize.STRING(10) },
      category: { type: Sequelize.STRING(50) },
      stock: { type: Sequelize.INTEGER },
      thumbnail: { type: Sequelize.STRING },
      discountPercentage: { type: Sequelize.DECIMAL(5, 2) }
    });
  },
  down: async (queryInterface) => { await queryInterface.dropTable('products'); }
};