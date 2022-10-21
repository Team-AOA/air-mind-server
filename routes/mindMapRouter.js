const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');
const {
  getMindMapData,
  postMindMapData,
  postHeadNodeData,
  putMindMapData,
} = require('./middlewares/dataHandlingMiddleware');
const { endOfMindMapReq } = require('./controllers/mindMapController');

router
  .route('/:mindMapId')
  .get(auth, getMindMapData, endOfMindMapReq)
  .post(auth, postMindMapData, postHeadNodeData, endOfMindMapReq)
  .put(auth, putMindMapData, endOfMindMapReq);
// .delete(auth, deleteMindMapData, deleteNodeData, endOfDeleteReq);

module.exports = router;