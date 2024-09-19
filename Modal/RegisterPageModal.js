// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const RegisterPageModal = sequelize.define('RegisterPageModal', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  officeNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sponsorship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assets: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companySector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incorporationDetails: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  services: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  businessCorridors: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  selectedCategories: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  websiteURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aboutYourself: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

sequelize.sync()
  .then(() => console.log('Users table has been created.'))
  .catch(err => console.log('Error: ' + err));

module.exports = RegisterPageModal;
