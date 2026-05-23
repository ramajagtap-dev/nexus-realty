const express = require('express');
const router = express.Router();
const { searchProperties } = require('../controllers/propertyController');

router.get('/search', searchProperties);

module.exports = router;