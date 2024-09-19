// utils/auth.js

const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, 'ASDEFEFIJF3FSFESFEFESGES', { expiresIn: '7d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, 'ASDEFEFIJF3FSFESFEFESGES');
};

module.exports = { generateToken, verifyToken };
