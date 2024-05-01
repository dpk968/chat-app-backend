// server.js
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
