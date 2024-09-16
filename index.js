const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // File system module for writing files
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Global variable to store Base64 encoded image
let base64Image = ''; // Declare globally

// Middleware to parse JSON body
app.use(bodyParser.json({ limit: '50mb' })); // Parse JSON and adjust size limit if needed

// Handle POST request to receive and store Base64 image from JSON body
app.post('/upload', (req, res) => {
  console.log('Received POST request');
  const { pic } = req.body; // Extract 'pic' key from the JSON body
  if (typeof pic === 'string' && pic.length > 0) {
    base64Image = pic; // Store the Base64 string globally
    console.log('Stored image data:', base64Image.slice(0, 100) + '...'); // Log part of the data for debugging
    res.send('Image data (Base64 encoded) uploaded and stored successfully');
  } else {
    res.status(400).send('Invalid or missing "pic" key in JSON');
  }
});

// Handle GET request to decode the Base64 image and send the JPEG file
app.get('/image', (req, res) => {
  console.log('Received GET request');
  if (base64Image.length > 0) {
    // Decode Base64 to binary
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Save the image as "image1.jpg"
    const imagePath = path.join(__dirname, 'image1.jpg');
    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        console.error('Error writing image file:', err);
        res.status(500).send('Error processing image');
      } else {
        // Send the image file as a response
        res.setHeader('Content-Type', 'image/jpeg');
        res.sendFile(imagePath);
      }
    });
  } else {
    res.status(404).send('No image data available');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});