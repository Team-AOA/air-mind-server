const Node = require('../../models/Node');

const getAllComments = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    const responseBody = {};

    const foundedNode = await Node.findById(nodeId);

    if (!foundedNode) {
      const error = new Error('nodeId is invalid');
      error.status = 502;
      next(error);
      return;
    }

    responseBody.result = 'ok';
    responseBody.data = foundedNode.comments;

    res.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    const { comment } = req.body;
    const responseBody = {};
    // TODO: req.user 추가

    const newComment = {
      comments: {
        author: 'alex',
        content: comment,
      },
    };

    const updatedNode = await Node.findOneAndUpdate(
      { _id: nodeId },
      {
        $addToSet: newComment,
      },
    );

    if (!updatedNode) {
      const error = new Error('nodeId is invalid');
      error.status = 502;
      next(error);
      return;
    }

    responseBody.result = 'ok';
    responseBody.data = updatedNode.comments;

    res.status(200).json(responseBody);
    return;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
};
