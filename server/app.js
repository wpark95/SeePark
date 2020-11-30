// Dependencies
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const formidable = require('formidable');
require('dotenv').config();

// GTM
const tmImage = require('@teachablemachine/image');
const tf = require('@tensorflow/tfjs');
const tfcore = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const image = require('get-image-data');

// Express
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}; // CORS options
const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');
const uploadFolder = path.join(__dirname, '..', 'client', 'dist', 'uploadedImages');
const app = express();

app.use(cors(corsOptions)); // Let CORS options to be used
app.use(express.static(DIST_DIR));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/test', (req, res) => {
    const form = formidable({
        multiples: false, // Uploading only one file at a time is allowed
        maxFileSize: 50 * 1024 * 1024, // 50MB
        uploadDir: uploadFolder,
    });

    form.parse(req, (err, fields, files) => {
        console.log('Received File : ', files.file);
        if (err) {
            res.status(500).send('Parsing Failed');
        } else {
            res.status(200).send('Parsing Successful');
        }
    });
});

// // Google Teachable Machine

// // More API functions here:
// // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// // the link to your model provided by Teachable Machine export panel
// const URL = process.env.GTM_MODEL_URL;
// console.log('This is URL', URL)

// let model, webcam, labelContainer, maxPredictions;

// // Load the image model and setup the webcam
// async function init() {
//     const modelURL = URL + "model.json";
//     const metadataURL = URL + "metadata.json";

//     // load the model and metadata
//     // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
//     // or files from your local hard drive
//     // Note: the pose library adds "tmImage" object to your window (window.tmImage)
//     model = await tmImage.load(modelURL, metadataURL);
//     maxPredictions = model.getTotalClasses();
// }

// async function loop() {
//     webcam.update(); // update the webcam frame
//     await predict();
//     window.requestAnimationFrame(loop);
// }

// // run the webcam image through the image model
// async function predict() {
//     // predict can take in an image, video or canvas html element
//     const prediction = await model.predict(webcam.canvas);
//     for (let i = 0; i < maxPredictions; i++) {
//         const classPrediction =
//             prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//         labelContainer.childNodes[i].innerHTML = classPrediction;
//     }
// }

module.exports = app;