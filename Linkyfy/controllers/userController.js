const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
};

module.exports = { registerUser };
