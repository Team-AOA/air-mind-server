const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');

const {
  getNodeData,
  makePlainObject,
  getMindMapData,
} = require('./middlewares/dataHandlingMiddleware');

const { endOfGetNodeReq } = require('./controllers/nodeController');
const { getPublicMindMaps } = require('./controllers/mindMapController');

const { endOfGetMindMapReq } = require('./controllers/mindMapController');

router.get(
  '/users/:userId/mind-maps/:mindMapId/nodes/:nodeId',
  auth,
  getNodeData,
  makePlainObject,
  endOfGetNodeReq,
);

router.get(
  '/users/:userId/mind-maps',
  auth,
  getMindMapData,
  endOfGetMindMapReq,
);

router.get('/mind-maps?access=public&max=15', getPublicMindMaps);

module.exports = router;
