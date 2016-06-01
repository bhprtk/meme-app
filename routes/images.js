'use strict';

const express = require('express');
const multer = require('multer');

let router = express.Router();
let upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    filesize: 1000000 * 10
  }
});

let Image = require('../models/image');

router.get('/getAll', (req, res) => {
  Image.find({}, (err, images) => {
    res.status(err ? 400 : 200).send(err || images);
  });
});


router.post('/', upload.single('newFile'), (req, res) => {
  console.log('req.file in post image', req.file);
  console.log('req.body in post image', req.body);
  Image.upload(req.file, req.body, (err, image) => {
    res.status(err ? 400 : 200).send(err || image);
  });
});

router.put('/upvoteById/:postId', (req, res) => {
  Image.upvoteById(req.params.postId, (err, upvotedPost) => {
    res.status(err ? 400 : 200).send(err || upvotedPost);

  });
});

router.put('/downvoteById/:postId', (req, res) => {
  Image.downvoteById(req.params.postId, (err, downvotedPost) => {
    res.status(err ? 400 : 200).send(err || downvotedPost);

  });
});

module.exports = router;
