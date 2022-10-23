const express = require('express');

const router = express.Router();

const auth = require('./middlewares/authMiddleware');
const {
  postHeadNodeData,
  getMindMapData,
  putMindMapData,
  postMindMapData,
  deleteMindMapData,
  getMindMapAccessData,
} = require('./middlewares/dataHandlingMiddleware');
const {
  endOfMindMapReq,
  endOfPostMindMapReq,
  endOfDeleteMindMapReq,
  endOfMindMapAccessReq,
} = require('./controllers/mindMapController');

router
  .route('/:mindMapId')
  .get(auth, getMindMapData, endOfMindMapReq)
  .put(auth, putMindMapData, endOfMindMapReq)
  .delete(auth, deleteMindMapData, endOfDeleteMindMapReq);

router
  .route('/')
  .post(auth, postMindMapData, postHeadNodeData, endOfPostMindMapReq);

router
  .route('/:mindMapId/access')
  .get(getMindMapAccessData, endOfMindMapAccessReq);

module.exports = router;
