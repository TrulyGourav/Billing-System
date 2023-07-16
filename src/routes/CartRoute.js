const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const {allCartItems, addProduct, addService, deleteProduct, deleteService, viewTotalBill, clearCart } = require('../controller/CartController');

router.get('/all-items/:userId', authMiddleware, allCartItems);

router.post("/product/add", authMiddleware, addProduct);

router.post("/service/add", authMiddleware, addService);

router.delete("/:userId/remove/product/:productId", authMiddleware, deleteProduct);

router.delete("/:userId/remove/service/:serviceId", authMiddleware, deleteService);

router.get('/total/:userId', authMiddleware, viewTotalBill);

router.delete('/clear/:userId', authMiddleware, clearCart);

module.exports = router;