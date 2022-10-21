const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');
const {
  getNodeData,
  putNodeData,
  makePlainObject,
  postNodeData,
} = require('./middlewares/dataHandlingMiddleware');
const {
  endOfGetNodeReq,
  endOfPutNodeReq,
  endOfPostNodeReq,
} = require('./controllers/nodeController');
const {
  getAllComments,
  createComment,
} = require('./controllers/commentController');

router
  .route('/:nodeId')
  .get(auth, getNodeData, makePlainObject, endOfGetNodeReq)
  .put(auth, putNodeData, endOfPutNodeReq)
  .post(auth, postNodeData, endOfPostNodeReq);

router.route('/:nodeId/comments').get(getAllComments).post(createComment);

module.exports = router;