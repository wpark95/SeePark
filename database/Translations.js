/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const translationSchema = new mongoose.Schema({
  trnaslationID: Number,
  language: String,
  sign: String,
  translation: String
});

const Translations = mongoose.model('Translations', translationSchema);

module.exports = Translations;
