const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');

const {
  getNodeData,
  putNodeData,
  makePlainObject,
  getMindMapData,
  postNodeData,
} = require('./middlewares/dataHandlingMiddleware');

const {
  endOfGetNodeReq,
  endOfPutNodeReq,
  endOfPostNodeReq,
} = require('./controllers/nodeController');

const {
  endOfGetMindMapReq,
  getPublicMindMaps,
} = require('./controllers/mindMapController');

router
  .route('/users/:userId/mind-maps/:mindMapId/nodes/:nodeId')
  .get(auth, getNodeData, makePlainObject, endOfGetNodeReq)
  .put(auth, putNodeData, endOfPutNodeReq)
  .post(auth, postNodeData, endOfPostNodeReq);

router.get(
  '/users/:userId/mind-maps',
  auth,
  getMindMapData,
  endOfGetMindMapReq,
);

router.get('/mind-maps?access=public&max=15', getPublicMindMaps);

module.exports = router;
