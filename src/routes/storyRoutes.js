const express = require('express');
const multer = require('multer');
const Story = require('../models/Story');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure the upload directory exists
const uploadsDir = path.join(__dirname, '../../uploads');  // Going up to the root directory
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),  // Save directly in 'uploads' directory
  filename: (req, file, cb) => cb(null, `story-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// Upload Story
router.post('/stories', upload.single('story'), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newStory = new Story({
      user: userId,
      mediaUrl: `/uploads/${req.file.filename}`,  // URL updated to match the new location
      mediaType: req.file.mimetype.startsWith('image') ? 'image' : 'video',
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Fetch Stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find({ expiresAt: { $gt: new Date() } });
    res.json(stories);
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories', error: error.message });
  }
});

module.exports = router;
