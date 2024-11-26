const express = require('express');
const Permission = require('../models/Permission');
const router = express.Router();

// Get all permissions
router.get('/', async (req, res) => {
  const permissions = await Permission.find();
  res.json(permissions);
});

// Create a new permission
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const permission = new Permission({ name, description });
  await permission.save();
  res.json({ message: 'Permission created', permission });
});

module.exports = router;
