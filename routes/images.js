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
  var imageObj = req.file;
  var imageInfoObj = req.body;

  if(imageObj) {
    Image.upload(imageObj, imageInfoObj, (err, image) => {
      res.status(err ? 400 : 200).send(err || image);
    });
  } else if(imageInfoObj) {
    Image.uploadImageWithUrl(imageInfoObj, (err, image) => {
      res.status(err ? 400 : 200).send(err || image);
    });
  }

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

router.delete('/deleteById/:imageId', (req, res) => {
  Image.findByIdAndRemove(req.params.imageId, err => {
    if(err) res.status(400).send(err);

    res.send();
  });
});

module.exports = router;
