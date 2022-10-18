const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
});

module.exports = mongoose.model('Comment', commentSchema);
