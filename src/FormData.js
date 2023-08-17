const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  // Add more fields as needed
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;