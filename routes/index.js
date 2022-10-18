const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');

const {
  getNodeData,
  makePlainObject,
} = require('./middlewares/dataHandlingMiddleware');

const { endOfGetNodeReq } = require('./controllers/nodeController');

router.get(
  '/users/:userId/mind-maps/:mindMapId/nodes/:nodeId',
  auth,
  getNodeData,
  makePlainObject,
  endOfGetNodeReq,
);

module.exports = router;
