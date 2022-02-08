const aws = require('aws-sdk');
const multers3 = require("multer-s3");
const multer = require("multer");

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3 : s3,
        bucket : "cloning1",
        acl : 'public-read',
        metadata: (req, file, cb) =>{
            cb( null, {fieldName: file.fieldname });
        },
        key: (req, file, cb) =>{
        cb( null, Date.now().toString());
        },
    })
});

module.exports = upload;