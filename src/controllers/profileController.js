const bcrypt = require('bcryptjs');
const User = require('../models').User;

const getProfile = async (req, res) => {
    try {
      const userId = req.userId;
  
      // Find user by ID
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const updateProfile = async (req, res) => {
    try {
      const userId = req.userId;
      const { username, password } = req.body;
  
      // Find user by ID
      let user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user data
      user.username = username || user.username;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteProfile = async (req, res) => {
    try {
      const userId = req.userId;
  
      // Delete user by ID
      const deletedUser = await User.destroy({ where: { id: userId } });
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = {
    getProfile,
    updateProfile,
    deleteProfile,
  };

