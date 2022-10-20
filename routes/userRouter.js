const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');
const { getMindMapData } = require('./middlewares/dataHandlingMiddleware');
const { endOfGetMindMapsReq } = require('./controllers/mindMapController');

router.get('/:userId/mind-maps', auth, getMindMapData, endOfGetMindMapsReq);

module.exports = router;
