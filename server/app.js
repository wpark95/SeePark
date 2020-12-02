// ***** Dependencies *****
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const formidable = require('formidable');
require('dotenv').config();
// GTM dependencies
const tmImage = require('@teachablemachine/image');
const tf = require('@tensorflow/tfjs');
const tfcore = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const image = require('get-image-data');
const TeachableMachine = require("@sashido/teachablemachine-node");
const AWS = require('aws-sdk');
// DB
const Translations = require('../database/Translations.js');
require('../database/index.js');

// ***** Express *****
const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}; // CORS options

const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');
const uploadFolder = path.join(__dirname, '..', 'client', 'dist', 'uploadedImages');

app.use(cors(corsOptions)); // Let CORS options to be used
app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const GTM_URL = process.env.GTM_MODEL_URL;
const model = new TeachableMachine({
    modelUrl: GTM_URL
});

// ***** S3 *****
const AWSBucket = process.env.AWS_S3_BUCKET;
const AWSKeyID = process.env.AWS_S3_KeyId;
const AWSKey = process.env.AWS_S3_Key;
const AWSRegion = process.env.AWS_S3_region;
const AWSACL = process.env.AWS_S3_ACL;

const s3bucket = new AWS.S3({
    accessKeyId: AWSKeyID,
    secretAccessKey: AWSKey,
    region: AWSRegion
});

const uploadParams = {
    Bucket: AWSBucket,
    Key: '',
    Body: '',
    ContentEncoding: '',
    ContentType: '',
    ACL: AWSACL
};

let imageFileInfo = {
    num: '',
    ext: '',
};

app.post('/api/test', (req, res) => {
    let imageFilePath;

    const form = formidable({
    multiples: false, // Uploading only one file at a time is allowed
    maxFileSize: 50 * 1024 * 1024, // 50MB
    uploadDir: uploadFolder,
    });

    form.parse(req, (err, fields, files) => {
        console.log('Received File : ', files.file.type);
        let imageFile = files.file.path;
        if (imageFileInfo.num === '') {
            imageFileInfo.num = 0;
        } else {
            imageFileInfo.num++;
        };
        imageFileInfo.ext = files.file.type.split('/')[1];
        if (err) {
            res.status(500).send('Parsing Failed');
        } else {
            // Uploade the image to S3
            let fileStream = fs.createReadStream(imageFile);
            fileStream.on('error', function(err) {
                console.log('File Error', err);
            });
            uploadParams.Key = path.basename(`${imageFileInfo.num}.${imageFileInfo.ext}`);
            uploadParams.Body = fileStream;
            uploadParams.ContentType = files.file.type;
            s3bucket.upload (uploadParams, function (err, data) {
                if (err) {
                    console.log("S3 Upload Error", err);
                } if (data) {
                    console.log("S3 Upload Success", data.Location);
                    // Use AWS S3 link to get prediction
                    return model.classify({
                        imageUrl: `https://${AWSBucket}.s3-${AWSRegion}.amazonaws.com/${imageFileInfo.num}.${imageFileInfo.ext}`
                    })
                    .then((predictions) => {
                        console.log(predictions);
                        res.send(predictions);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(405).send('Something went 405')
                    })
                }
            });
        }
    });
});

module.exports = app;