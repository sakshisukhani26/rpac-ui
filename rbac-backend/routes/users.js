const express = require('express');
const User = require('../models/User');
const Role = require('../models/Role');
const router = express.Router();


// Register a new user
router.post('/users', async (req, res) => {
  const { username, password, roles } = req.body;
   // Validate required fields
   if (!username || !password || !roles) {
    return res.status(400).json({ message: 'Username, password, and roles are required.' });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }
  const user = new User({ username, password, roles });
  await user.save();
  res.json({ message: 'User registered', user });
});

// Assign a role to a user
router.post('/assign-role', async (req, res) => {
  const { userId, roleId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.roles.push(roleId);
  await user.save();
  res.json({ message: 'Role assigned', user });
});

module.exports = router;
