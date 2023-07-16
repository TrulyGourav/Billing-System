const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const { add, remove, all, get } = require('../controller/SerivceController');


// Add a service
router.post('/', authMiddleware, add);

// Remove a service
router.delete('/:serviceId', authMiddleware, remove);

// Get all services
router.get('/all', authMiddleware, all);

// Get a single service
router.get('/:serviceId', authMiddleware, get);

module.exports = router;