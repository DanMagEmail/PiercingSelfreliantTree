const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Global variable to store Base64 encoded image
let base64Image = ''; // Declare globally

// Increase payload size limit for text data
app.use(bodyParser.text({ limit: '50mb' })); // Adjust the limit as needed

// Handle POST request to receive and store text data
app.post('/upload', (req, res) => {
  console.log('Received POST request');
  if (typeof req.body === 'string' && req.body.length > 0) {
    base64Image = req.body; // Store the Base64 string globally
    console.log('Stored image data:', base64Image.slice(0, 100) + '...'); // Log part of the data for debugging
    res.send('Text data (Base64 encoded image) uploaded and stored successfully');
  } else {
    res.status(400).send('No valid text data provided');
  }
});

// Handle GET request to retrieve the stored text data
app.get('/image', (req, res) => {
  console.log('Received GET request');
  if (base64Image.length > 0) {
    res.setHeader('Content-Type', 'text/plain'); // Set response content type to plain text
    res.send(base64Image); // Send only the Base64 string as plain text
  } else {
    res.status(404).send('No image data available');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});