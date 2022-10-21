const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');
const {
  postHeadNodeData,
  getMindMapData,
  putMindMapData,
  postMindMapData,
  deleteMindMapData,
} = require('./middlewares/dataHandlingMiddleware');
const {
  endOfMindMapReq,
  endOfPostMindMapReq,
} = require('./controllers/mindMapController');

router
  .route('/:mindMapId')
  .get(auth, getMindMapData, endOfMindMapReq)
  .put(auth, putMindMapData, endOfMindMapReq)
  .delete(auth, deleteMindMapData, endOfMindMapReq);

router
  .route('/')
  .post(auth, postMindMapData, postHeadNodeData, endOfPostMindMapReq);

module.exports = router;
