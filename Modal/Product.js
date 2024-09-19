const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    images: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    tableName: 'Products' 
});

module.exports = Product;
