const express = require('express');

const router = express.Router();
const multer = require('multer');

const auth = require('./middlewares/authMiddleware');
const {
  getNodeData,
  putNodeData,
  makePlainObject,
  postNodeData,
  deleteNodeData,
  isPublicNode,
} = require('./middlewares/dataHandlingMiddleware');
const {
  endOfGetNodeReq,
  endOfPutNodeReq,
  endOfPostNodeReq,
  endOfDeleteNodeReq,
} = require('./controllers/nodeController');
const {
  getAllComments,
  createComment,
} = require('./controllers/commentController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tmpImages/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.fieldname}`);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const upload = multer({ storage });

router
  .route('/:nodeId')
  .get(getNodeData, makePlainObject, isPublicNode, auth, endOfGetNodeReq)
  .put(auth, upload.array('images'), putNodeData, endOfPutNodeReq)
  .post(auth, postNodeData, endOfPostNodeReq)
  .delete(auth, deleteNodeData, endOfDeleteNodeReq);

router.route('/:nodeId/comments').get(getAllComments).post(createComment);

module.exports = router;
