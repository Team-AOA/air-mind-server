const Node = require('../../models/Node');

const getAllComments = async (req, res, next) => {
  try {
    const { nodeId } = req.params;

    const foundedNode = await Node.findById(nodeId);

    if (!foundedNode) {
      const error = new Error('nodeId is invalid');
      error.status = 502;
      next(error);
      return;
    }

    const responseBody = {};
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
    const { userName, comment } = req.body;

    const newComment = {
      comments: {
        author: userName,
        content: comment,
      },
    };

    const updatedNode = await Node.findOneAndUpdate(
      { _id: nodeId },
      {
        $addToSet: newComment,
      },
      { returnOriginal: false },
    );

    if (!updatedNode) {
      const error = new Error('nodeId is invalid');
      error.status = 502;
      next(error);
      return;
    }

    const responseBody = {};
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
