const jwt = require('jsonwebtoken');
const { User } = require('../Modal/User');
const jwtSecret = 'your_jwt_secret'; // Define your JWT secret key

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        // Verify token and extract user ID and role
        const decoded = jwt.verify(token, jwtSecret); // Change verifyToken to verify
        const { userId, role } = decoded;
        
        // Check if user exists in the database
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        // Check if user role is "admin"
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin role required' });
        }

        // Attach user ID and role to the request object
        req.user = { id: userId, role };
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { requireAuth };
