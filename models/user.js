'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var request = require('request');
var qs = require('querystring');
var moment = require('moment');

var AWS = require('aws-sdk');
var uuid = require('uuid');
var s3 = new AWS.S3();
var bucketName = process.env.AWS_BUCKET;
var urlBase = process.env.AWS_URL_BASE;

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}


var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  displayName: String,
  picture: String,
  posted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});


userSchema.statics.uploadProfilePic = function(file, userId, cb) {

  if(!file.mimetype.match(/image/)) {
    return cb({error: 'File must be image.'});
  }

  let filenameParts = file.originalname.split('.');

  let ext;
  if(filenameParts.length > 1) {
    ext = '.' + filenameParts.pop();
  } else {
    ext = '';
  }

  let key = uuid() + `${ext}`;

  let params = {
    Bucket: bucketName,
    Key: key,
    ACL: 'public-read',
    Body: file.buffer
  };

  s3.putObject(params, (err, result) => {
    if(err) return cb(err);

    let imgUrl = `${urlBase}/${bucketName}/${key}`;

    User.findById(userId, (err, dbUser) => {
      dbUser.picture = imgUrl;
      dbUser.save((err, savedUser) => {
        cb(err, savedUser);
      });
    });

  });
};


userSchema.statics.uploadProfilePicWithUrl = function(url, userId, cb) {
  User.findById(userId, (err, dbUser) => {
    dbUser.picture = url;
    dbUser.save((err, savedUser) => {
      cb(err, savedUser);
    });
  });
};


userSchema.statics.addUploadedImage = function(userId, imageId, cb) {

  User.findById(userId, (err, dbUser) => {
    if(err) cb(err);

    dbUser.posted.push(imageId);
    dbUser.save((err, savedUser) => {
      cb(err, savedUser);
    });
  });


};

userSchema.statics.addLikedPost = function(userId, imageId, cb) {

  User.findById(userId, (err, dbUser) => {
    if(err) cb(err);

    dbUser.liked.push(imageId);
    dbUser.save((err, savedUser) => {
      cb(err, savedUser);
    });
  });
};

userSchema.statics.addUnlikedPost = function(userId, imageId, cb) {
  User.findById(userId, (err, dbUser) => {
    if(err) cb(err);

    dbUser.disliked.push(imageId);
    dbUser.save((err, savedUser) => {
      cb(err, savedUser);
    });
  });
};

userSchema.statics.removeFromLiked = function(userId, imageId, cb) {
  User.findById(userId, (err, dbUser) => {
    if(err) cb(err);

    var index = dbUser.liked.indexOf(imageId);

    if(index >= 0) {
      dbUser.liked.splice(index, 1);
      dbUser.save((err, savedUser) => {
        console.log('savedUser', savedUser);
        cb(err, savedUser);
      });

    } else {
      cb(err, dbUser);

    }
});
};

userSchema.statics.removeFromDisliked = function(userId, imageId, cb) {
  User.findById(userId, (err, dbUser) => {
    if(err) cb(err);

    var index = dbUser.disliked.indexOf(imageId);

    if(index >= 0) {
      dbUser.disliked.splice(index, 1);
      dbUser.save((err, savedUser) => {
        cb(err, savedUser);
      });

    } else {
      cb(err, dbUser);

    }
});
};



userSchema.statics.createJWT = function(user) {
  var token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'day').unix() // in seconds
  }, JWT_SECRET);
  return token;
}






var User = mongoose.model('User', userSchema);

module.exports = User;
