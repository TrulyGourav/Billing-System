const express = require('express');
const { add, remove, get, allProducts} = require('../controller/ProductController');
const authMiddleware = require('../middleware/AuthMiddleware');
const router = express.Router();

//Product related endpoints
router.post('/', authMiddleware, add);
router.get("/all", authMiddleware, allProducts);
router.get("/:id", authMiddleware, get)
router.delete('/:id', authMiddleware, remove);

module.exports = router;