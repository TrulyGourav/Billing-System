const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const { add, remove, all, get } = require('../controller/SerivceController');

router.post('/', authMiddleware, add);

router.delete('/:serviceId', authMiddleware, remove);

router.get('/all', authMiddleware, all);

router.get('/:serviceId', authMiddleware, get);

module.exports = router;