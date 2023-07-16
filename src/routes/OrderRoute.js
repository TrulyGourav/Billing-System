const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const { confirmOrder } = require('../controller/OrderController');

router.get("/confirm/:userId", authMiddleware, confirmOrder);

module.exports = router;