var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/getAllUsers', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
});

router.get('/getCurrentUser/:email', (req, res) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if(err) res.status(400).send(err);

    res.send(user);
  }).select('-password');

});

router.put('/addUpvote/:userId', (req, res) => {

  User.addLikedPost(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);
    res.status(200).send(savedUser);
  });

});


router.put('/addDownvote/:userId', (req, res) => {

  User.addUnlikedPost(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);
    res.status(200).send(savedUser);
  });

});


router.put('/findIfLiked/:userId', (req, res) => {
  var imageId = req.body.imageId;

  User.findById(req.params.userId, (err, dbUser) => {
    if(err) res.status(400).send(err);

    if(dbUser.liked.indexOf(imageId) >= 0) {
      res.status(200).send('cannot upvote');
    } else {
      res.status(200).send('can upvote');

    }
  });
});

router.put('/findIfDisliked/:userId', (req, res) => {
  var imageId = req.body.imageId;

  User.findById(req.params.userId, (err, dbUser) => {
    if(err) res.status(400).send(err);

    if(dbUser.disliked.indexOf(imageId) >= 0) {
      res.status(200).send('cannot downvote');
    } else {
      res.status(200).send('can downvote');

    }
  });
});


router.put('/removeFromLiked/:userId', (req, res) => {

  User.removeFromLiked(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.status(200).send(savedUser);
  });


});

router.put('/removeFromDisliked/:userId', (req, res) => {

  User.removeFromDisliked(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.status(200).send(savedUser);
  });


});



module.exports = router;
