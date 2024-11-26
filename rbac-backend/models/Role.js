const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }] // A list of permissions for each role
});

module.exports = mongoose.model('Role', RoleSchema);
