// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (including your photo)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello! Your Node.js app is running on Heroku 🚀</h1>
    <img src="my_photo.jpg" alt="My Photo" style="max-width: 100%; height: auto;" />
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

