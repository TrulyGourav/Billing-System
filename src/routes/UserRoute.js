const express = require('express');
const { signup, signin, deleteUser } = require('../controller/UserController');
const authMiddleware = require('../middleware/AuthMiddleware');
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);

router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
