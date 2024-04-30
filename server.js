// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const app = express();
dotenv.config();

const authRoutes = require('./src/routes/auth');

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
