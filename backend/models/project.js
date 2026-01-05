const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  userId: { type: String, required: true },
<<<<<<< HEAD
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: { type: String, required: true },
  description: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  skills: [{ type: String }],
  github: { type: String, required: true },
=======
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  github: { type: String, required: false },
  link: { type: String, required: false },
>>>>>>> main
});

module.exports = mongoose.model('Project', projectSchema);