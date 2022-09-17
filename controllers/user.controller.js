const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Reviews } = require('../models/reviews.model');
const { Restaurants } = require('../models/restaurants.model');
const { Orders } = require('../models/orders.model');
const { Meals } = require('../models/meals.model');

//Utils

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: '../config.env' });

//Define controllers

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { status: 'active' },
        include: [
            {
                model: Orders,
                include: {
                    model: Meals,
                    include: { model: User }
                }
            },
            {
                model: Meals,
            }
        ],
    })
    res.status(200).json({
        status: 'success',
        data: { users },
    });
});



const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (role !== 'admin' && role !== 'normal') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid role',
        });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    // Remove password from response
    newUser.password = undefined;

    // 201 -> Success and a resource has been created
    res.status(201).json({
        status: 'success',
        data: { newUser },
    });
});
const updatedUser = catchAsync(async (req, res) => {
    const { name, email } = req.body
    const { user } = req
    await user.update({ name, email })

    res.status(200).json({
        status: 'succes',
        data: { user }
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await user.update({ status: 'disable' })

    res.status(204).json({ status: 'succes' })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: { email, status: 'active' }
    });
    // if (!user || (await bcrypt.compare(password, user.password))) {
    //     return next(new AppError('Wrong credentials', 400))
    // }
    user.password = undefined

    const token = jwt.sign({ id: user.id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        });
    res.status(200).json({
        status: 'success',
        data: { user, token },
    })
})







module.exports = {
    getAllUsers,
    createUser,
    updatedUser,
    deleteUser,
    login,
};
