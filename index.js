const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Increase payload size limit for text data
app.use(bodyParser.text({ limit: '50mb' })); // Adjust the limit as needed

// Global variable to store Base64 encoded image
let base64Image = '';

// Handle POST request to receive and store text data
app.post('/upload', (req, res) => {
  if (req.body) {
    base64Image = req.body; // Assuming the entire body is the Base64 string
    res.send('Text data (Base64 encoded image) uploaded and stored successfully');
  } else {
    res.status(400).send('No text data provided');
  }
});

// Handle GET request to retrieve the stored text data
app.get('/image', (req, res) => {
  if (base64Image) {
    res.send(base64Image);
  } else {
    res.status(404).send('No image data available');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});