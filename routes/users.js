var express = require('express');
var multer = require('multer');

var router = express.Router();
var upload= multer({
  storage: multer.memoryStorage(),
  limits: {
    filesize: 1000000 * 10
  }
})

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

router.get('/getUserById/:userId', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) res.status(400).send(err);

    res.send(user);
  }).select('-password');
});

router.get('/getLikedPosts/:userId', (req, res) => {
  User.findById(req.params.userId, (err, likedPosts) => {
    if(err) res.status(400).send(err);
    res.send(likedPosts);
  })
  .select('liked')
  .populate('liked');
});

router.get('/getUploadedPosts/:userId', (req, res) => {
  User.findById(req.params.userId, (err, uploadedPosts) => {
    if(err) res.status(400).send(err);
    res.send(uploadedPosts);
  })
  .select('posted')
  .populate('posted');
});

router.post('/profilePic', upload.single('newFile'), (req, res) => {

  if(req.file) {
    User.uploadProfilePic(req.file, req.body.userId, (err, updatedUser) => {
      res.status(err ? 400 : 200).send(err || updatedUser);
    });
  } else if(req.body) {
    User.uploadProfilePicWithUrl(req.body.newFile, req.body.userId, (err, updatedUser) => {
      res.status(err ? 400 : 200).send(err || updatedUser);
    });
  }

});

router.post('/addComment/:userId', (req, res) => {

  User.addComment(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.send(savedUser);
  })
})

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

router.put('/addUploadedImage/:userId', (req, res) => {

  User.addUploadedImage(req.params.userId, req.body.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.status(200).send(savedUser);
  });

});

router.put('/updateName/:userId', (req, res) => {

  User.findByIdAndUpdate(req.params.userId, {$set: { displayName: req.body.newName }}, {new: true}, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.status(200).send(savedUser);
  });

});

// remove imageId from users,
router.delete('/removePost/:userId', (req, res) => {
  User.removePost(req.params.userId, req.query.imageId, (err, savedUser) => {
    if(err) res.status(400).send(err);

    res.send(savedUser);
  });
});


module.exports = router;
