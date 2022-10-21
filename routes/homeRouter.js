const express = require('express');

const router = express.Router();

const { endOfMindMapListReq } = require('./controllers/mindMapController');
const {
  getPublicMindMapList,
} = require('./middlewares/dataHandlingMiddleware');

router.get('/mind-maps', getPublicMindMapList, endOfMindMapListReq);

module.exports = router;
