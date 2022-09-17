const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	deleteUser,
	login,
	updatedUser,
} = require('../controllers/user.controller');
const { userExists } = require('../middlewares/users.middleware');

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
usersRouter.post('/login', login)
usersRouter.patch('/:id', userExists, updatedUser)
usersRouter.delete('/:id', userExists, deleteUser);
// usersRouter.post('/login', login);

// Protecting below endpoints
// usersRouter.use(protectSession);

// usersRouter.get('/', protectAdmin, getAllUsers);
usersRouter.get('/', getAllUsers);

// usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

// usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
