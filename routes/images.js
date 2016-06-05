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

var Image = require('../models/image');
var User = require('../models/user');

router.get('/getAll', (req, res) => {
  Image.find({}, (err, images) => {
    res.status(err ? 400 : 200).send(err || images);
  });
});

router.get('/getComments/:imageId', (req, res) => {
  Image.findById(req.params.imageId, (err, image) => {
    if(err) res.status(400).send(err);

    res.send(image.comments);

  }).populate('comments.commentedBy');
})


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

router.post('/addComment/:imageId', (req, res) => {

  Image.addComment(req.params.imageId, req.body, (err, savedImage) => {
    if(err) res.status(400).send(err);

    res.send(savedImage);
  })
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
