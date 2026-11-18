const express = require('express');
const router = express.Router();
const { createShortUrl, getAllUrls, deleteUrl } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/urls', getAllUrls);
router.delete('/urls/:id', deleteUrl);

module.exports = router;
