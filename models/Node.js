const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const nodeSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  comments: [{ type: String }],
  parent: { type: mongoose.Schema.Types.ObjectId, required: true },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
      autopopulate: { maxDepth: 5 },
    },
  ],
  attribute: {
    shape: { type: String, required: true },
    size: { type: String, required: true, default: 'medium' },
    cordX: { type: Number, required: true },
    cordY: { type: Number, required: true },
    color: { type: String, required: true },
    isFold: { type: Boolean, required: true },
  },
});

nodeSchema.plugin(autoPopulate);

module.exports = mongoose.model('Node', nodeSchema);
