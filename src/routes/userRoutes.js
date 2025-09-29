const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateUser } = require('../validations/userValidation');
// const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

// GET all users
// router.get('/', authMiddleware, userController.getAllUsers);
router.get('/', userController.getAllUsers);

// POST create user
// router.post('/', authMiddleware, validateUser, userController.createUser);

module.exports = router;