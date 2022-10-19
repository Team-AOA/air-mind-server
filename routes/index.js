const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');

const {
  getNodeData,
  putNodeData,
  makePlainObject,
  getMindMapData,
} = require('./middlewares/dataHandlingMiddleware');

const {
  endOfGetNodeReq,
  endOfPutNodeReq,
} = require('./controllers/nodeController');

const {
  endOfGetMindMapReq,
  getPublicMindMaps,
} = require('./controllers/mindMapController');

router.get(
  '/users/:userId/mind-maps/:mindMapId/nodes/:nodeId',
  auth,
  getNodeData,
  makePlainObject,
  endOfGetNodeReq,
);

router.put(
  '/users/:userId/mind-maps/:mindMapId/nodes/:nodeId',
  auth,
  putNodeData,
  endOfPutNodeReq,
);

router.get(
  '/users/:userId/mind-maps',
  auth,
  getMindMapData,
  endOfGetMindMapReq,
);

router.get('/mind-maps?access=public&max=15', getPublicMindMaps);

module.exports = router;
