const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authorizeRole');

const { validateUser } = require('../validations/userValidation');
// const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

// GET all users
// router.get('/', authMiddleware, userController.getUsers);
router.get('/', userController.getUsers);

// POST create user
// router.post('/', authMiddleware, validateUser, userController.createUser);
router.post('/', userController.createUser);

router.get('/search', userController.searchUsers);


// GET single user by ID
router.get('/:id', userController.getUserById);

// PUT update user by ID
router.put('/:id', userController.updateUser);

// DELETE user by ID
router.delete('/:id', userController.deleteUser);



module.exports = router;


// router.get('/admin-dashboard', authMiddleware, authorizeRole('admin', 'superadmin'), (req, res) => {
//   res.json({ message: 'Welcome to Admin Dashboard' });
// });