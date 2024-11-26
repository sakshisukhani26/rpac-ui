const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// Create a new role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });
  await role.save();
  res.json({ message: 'Role created', role });
});

module.exports = router;
