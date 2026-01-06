const express = require('express');
const { handleGenerateShortURL, handleAnatlytics } = require('../controllers/url_controller')
const router = express.Router();

router.post('/', handleGenerateShortURL)
router.get('/analytics/:shortId', handleAnatlytics)

module.exports = router;