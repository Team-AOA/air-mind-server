const mongoose = require('mongoose');

const mindMapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  access: { type: String, required: true, default: 'private' },
  headNode: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
});

module.exports = mongoose.model('MindMap', mindMapSchema);
