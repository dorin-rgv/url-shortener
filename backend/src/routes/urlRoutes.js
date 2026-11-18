const express = require('express');
const router = express.Router();
// Import your controller functions
const { shortenUrl, getUrls } = require('../controllers/urlController');

// POST /api/shorten
router.post('/shorten', shortenUrl);

// GET /api/urls
router.get('/urls', getUrls);

module.exports = router;
