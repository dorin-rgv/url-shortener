const express = require('express');
const {
    createShortUrl,
    getAllUrls,
    deleteUrl,
} = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/urls', getAllUrls);
router.delete('/urls/:id', deleteUrl);

module.exports = router;