// controllers/userController.js

const { User } = require('../Modal/User');
const { generateToken } = require('../Utils/auth');
const bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if username is already taken
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // If username is available, create a new user
        const newUser = await User.create({ username, password });
        const token = generateToken(newUser.id, newUser.role);
        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        
        // Check if user exists and password is correct
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Generate JWT token with user ID and role
        const token = generateToken(user.id, user.role);
        
        // Include user role in the response
        res.json({ message: 'User logged in successfully', token, role: user.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, role } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username || user.username;
        user.password = password || user.password;
        user.role = role || user.role;
 
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
       
        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

