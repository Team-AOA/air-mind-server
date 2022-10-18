const express = require('express');

const router = express.Router();

const { auth } = require('./middlewares/authMiddleware');

router.get('/users/:userId/mind-maps/:mindMapId/nodes/:nodeId', auth);

module.exports = router;
