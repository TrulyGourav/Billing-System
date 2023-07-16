const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const {allCartItems, addProduct, addService, deleteProduct, deleteService, viewTotalBill, clearCart } = require('../controller/CartController');


//*Param*required: {userId}
router.get('/all-items/:userId', authMiddleware, allCartItems);

//*body* required: {userId, productID}
router.post("/product/add", authMiddleware, addProduct);

//*body* required: {userId, serviceId}
router.post("/service/add", authMiddleware, addService);

//*Param* parameters required: {userId, itemId}
router.delete("/:userId/remove/product/:productId", authMiddleware, deleteProduct);

//*Param* parameters required: {userId, itemId}
router.delete("/:userId/remove/service/:serviceId", authMiddleware, deleteService);

router.get('/total/:userId', authMiddleware, viewTotalBill);

router.delete('/clear/:userId', authMiddleware, clearCart);



module.exports = router;