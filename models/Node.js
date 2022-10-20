const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const nodeSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    comments: [commentSchema],
    parent: { type: mongoose.Schema.Types.ObjectId },
    mindMap: { type: mongoose.Schema.Types.ObjectId },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        autopopulate: { maxDepth: 5 },
      },
    ],
    attribute: {
      shape: { type: String, required: true },
      size: { type: String, required: true, default: 'mdeium' },
      cordX: { type: Number, required: true },
      cordY: { type: Number, required: true },
      color: { type: String, required: true },
      isFold: { type: Boolean, required: true },
    },
  },
  { timestamps: true },
);

nodeSchema.plugin(autoPopulate);

module.exports = mongoose.model('Node', nodeSchema);
