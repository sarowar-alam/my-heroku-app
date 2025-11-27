// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (including your photo)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Module - 02 | Batch 08</title>
    </head>
    <body>
        <h1>Hello! Your Node app is running on Heroku</h1>
        <img src="my_photo.jpg" alt="My Photo" style="max-width: 100%; height: auto;" />
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
