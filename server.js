// src/server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const app = express();
dotenv.config();

const authRoutes = require('./src/routes/auth');

app.use(bodyParser.json());


app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;


sequelize.sync().then(() => {
  https.createServer({
    key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
  }, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
