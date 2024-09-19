// controllers/userController.js
const RegsiterForm = require('../Controller/RegisterController');

const RegisterController = async (req, res) => {
  try {
    const filePath = req.file ? req.file.path : '';
    const user = await RegsiterForm.create({ ...req.body, file: filePath });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    RegisterController,
};
