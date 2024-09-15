const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies in POST requests
app.use(express.json());

// Global variable to store the value of "PIC"
let picString = "";

// Handle POST request to store the value of "PIC"
app.post('/pic', (req, res) => {
  const { PIC } = req.body;

  // Check if "PIC" exists in the request body
  if (PIC) {
    // Update the global variable
    picString = PIC;
    res.send(`Stored string: ${picString}`);
  } else {
    // Respond with error if "PIC" is missing
    res.status(400).send('Error: "PIC" key is missing in the request body.');
  }
});

// Handle GET request to return the stored "PIC" string
app.get('/pic', (req, res) => {
  if (picString) {
    res.send(`${picString}`);
  } else {
    res.send('No string stored yet.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});