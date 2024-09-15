const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Increase payload size limit for JSON
app.use(bodyParser.json({ limit: "50mb" })); // Adjust the limit as needed

// Global variable to store Base64 encoded image
let base64Image = "";

// Handle POST request to upload image
app.post("/upload", (req, res) => {
  if (req.body && req.body.image) {
    base64Image = req.body.image;
    res.send("Image uploaded and encoded successfully");
  } else {
    res.status(400).send("No image data");
  }
});

// Handle GET request to retrieve the Base64 encoded image
app.get("/image", (req, res) => {
  if (base64Image) {
    res.send(base64Image);
  } else {
    res.status(404).send("No image available");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
