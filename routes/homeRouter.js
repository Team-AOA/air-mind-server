const express = require('express');

const router = express.Router();

const { getPublicMindMaps } = require('./controllers/mindMapController');

router.get('/mind-maps?access=public&max=15', getPublicMindMaps);

module.exports = router;
