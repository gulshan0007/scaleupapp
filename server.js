const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const storyRoutes = require('./src/routes/storyRoutes');

const app = express();
const PORT = 5000;
const multer = require('multer');
const path = require('path');

// Configure Multer for storing files in 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the 'uploads' folder exists
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // Use the original filename or append a timestamp to it to avoid collisions
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set up Multer with storage configuration
const upload = multer({ storage });


app.use(cors());
app.use(express.json());
app.use('./uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/storyApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/stories', storyRoutes);

app.listen(PORT, () => console.log(`Server running on http://192.168.1.100:${PORT}`));
