const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
], authController.login);

router.post('/verify-token', authController.refresh);

router.post('/logout', authMiddleware, authController.logout);

module.exports = router;