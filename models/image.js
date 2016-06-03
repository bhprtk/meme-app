'use strict';

let AWS = require('aws-sdk');
let mongoose = require('mongoose');
let uuid = require('uuid');

let s3 = new AWS.S3();

let bucketName = process.env.AWS_BUCKET;
let urlBase = process.env.AWS_URL_BASE;

let imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  displayTitle: { type: String },
  points: { type: Number, default: 0 }
},
  {
    timestamps: true
  }
);


imageSchema.statics.uploadImageWithUrl = function(imageInfo, cb) {

  Image.create({
    url: imageInfo.newFile,
    name: imageInfo.displayTitle,
    displayTitle: imageInfo.displayTitle
  }, cb);



};


imageSchema.statics.upvoteById = function(postId, cb) {
  Image.findById(postId, (err, dbImage) => {
    if(err) cb(err);

    dbImage.points++;
    dbImage.save((err, savedImage) => {
      cb(err, savedImage);
    });
  });
};

imageSchema.statics.downvoteById = function(postId, cb) {
  Image.findById(postId, (err, dbImage) => {
    if(err) cb(err);

    dbImage.points--;
    dbImage.save((err, savedImage) => {
      cb(err, savedImage);
    });
  });
};



imageSchema.statics.upload = (file, imageInfo, cb) => {
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

    Image.create({
      url: imgUrl,
      name: file.originalname,
      displayTitle: imageInfo.displayTitle
    }, cb);
  });
};

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;
