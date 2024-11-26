const mongoose = require('mongoose');
const Role = require('./models/Role');  // Import the Role model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rbac_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected for role insertion');

    // Add roles if they do not exist
    const roles = ['admin', 'user'];

    for (const roleName of roles) {
      const roleExists = await Role.findOne({ name: roleName });

      if (!roleExists) {
        const role = new Role({ name: roleName });
        await role.save();
        console.log(`Role "${roleName}" created.`);
      }
    }

    // Disconnect after insertion
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
