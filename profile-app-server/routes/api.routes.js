const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

router.get('/users', (req, res) => {
  User.find()
    .then((userFromDB) => res.status(200).json(userFromDB))
    .catch((err) => console.log(err));
});

router.put('/users', fileUploader.single('imageUrl'), (req, res) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

router.post('/upload', (req, res) => {
  User.create(req.body)
    .then((createdUser) => {
      res.status(200).json(createdUser);
    })
    .catch((err) => next(err));
});

module.exports = router;
