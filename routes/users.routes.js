const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	// updateUser,
	// deleteUser,
	// login,
} = require('../controllers/user.controller');

// Middlewares
// const { userExists } = require('../middlewares/users.middlewares');
// const {
// 	protectSession,
// 	protectUsersAccount,
// 	protectAdmin,
// } = require('../middlewares/auth.middlewares');
// const {
// 	createUserValidators,
// } = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

// usersRouter.post('/', createUserValidators, createUser);
usersRouter.post('/', createUser);

// usersRouter.post('/login', login);

// Protecting below endpoints
// usersRouter.use(protectSession);

// usersRouter.get('/', protectAdmin, getAllUsers);
usersRouter.get('/', getAllUsers);

// usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

// usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };