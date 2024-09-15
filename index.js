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
  console.log('Received POST request');
  if (req.body) {
    base64Image = req.body; // Store the Base64 string
    console.log('Stored image data:', base64Image.slice(0, 100) + '...'); // Log part of the data for debugging
    res.send('Text data (Base64 encoded image) uploaded and stored successfully');
  } else {
    res.status(400).send('No text data provided');
  }
});

// Handle GET request to retrieve the stored text data
app.get('/image', (req, res) => {
  console.log('Received GET request');
  if (base64Image) {
    res.json({ image: base64Image }); // Return the data as JSON
  } else {
    res.status(404).json({ message: 'No image data available' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});