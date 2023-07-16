//This file contains few of all Admin API routes (eg. only restricted APIs)

const express = require('express');
const router = express.Router();
const { orders } = require('../controller/AdminController');
const adminAuthMiddleware = require('../middleware/AdminMiddleware');
const authMiddleware = require('../middleware/AuthMiddleware');

//restricted APIs for admin
router.get('/orders', authMiddleware, adminAuthMiddleware, orders);

module.exports = router;