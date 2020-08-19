const app = require('./app');
const express = require('express');
const path = require('path');
const fs = require('fs');
const tf = require('@tensorflow/tfjs');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const image = require("get-image-data");
// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
require('@tensorflow/tfjs-node');


const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
