const express = require('express');
const router = express.Router();

// Import the exact functions from your controller
const {
    createShortUrl,
    getAllUrls,
    deleteUrl,
} = require('../controllers/urlController'); // Make sure this path is correct

// @route   POST /api/shorten
// @desc    Create a short URL
router.post('/shorten', createShortUrl);

// @route   GET /api/urls
// @desc    Get all shortened URLs
router.get('/urls', getAllUrls);

// @route   DELETE /api/urls/:id
// @desc    Delete a URL
router.delete('/urls/:id', deleteUrl);

// Note: The handleRedirect function is handled in index.js at the root level (/:shortCode),
// so you don't need to put it in this specific router.

module.exports = router;
