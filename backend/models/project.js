const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  github: { type: String, required: false },
  link: { type: String, required: false },
  isConfidential: { type: Boolean, default: false } 
});

module.exports = mongoose.model('Project', projectSchema);