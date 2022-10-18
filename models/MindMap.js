const mongoose = require('mongoose');

const mindMapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  access: { type: String, required: true, default: 'private' },
  headNode: { type: mongoose.Schema.Types.ObjectId, require: true },
});

module.exports = mongoose.model('MindMap', mindMapSchema);
