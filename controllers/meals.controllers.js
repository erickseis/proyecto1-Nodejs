const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//models
const { Meals } = require('../models/meals.model')
const { Restaurants } = require('../models/restaurants.model')
const { Reviews } = require('../models/reviews.model')
const { User } = require('../models/user.model')

//utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

dotenv.config()

// Crud
const createMeals = catchAsync(async (req, res, next) => {
    const { id } = req.restaurant

    const { name, price } = req.body

    const newMeal = await Meals.create({
        name,
        price,
        restaurantId: id,
    })

    res.status(201).json({
        status: 'success',
        newMeal,
    })
});


// CRUD
const readActiveMeals = catchAsync(async (req, res, next) => {
    const meals = await Meals.findAll({
        attributes: ['id', 'name', 'price'],
        where: { status: 'active' },
        include: {
            model: Restaurants,
            where: { status: 'active' },

            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
            include: {
                model: Reviews,
                where: { status: 'active' },
                required: false,
                attributes: ['id', 'comment', 'rating'],
                include: {
                    model: User,
                    required: false,
                    attributes: ['id', 'name', 'email'],
                },
            },
        },
    })

    res.status(200).json({
        status: 'success',
        data: {
            meals,
        },
    })
})

// CRUD
const readActiveMealById = catchAsync(async (req, res, next) => {
    const { id } = req.meal

    const meal = await Meals.findOne({
        where: { id, status: 'active' },
        attributes: ['id', 'name', 'price'],
        include: {
            model: Restaurants,
            where: { status: 'active' },

            /* Here i don't use required because i think if restaurant is disabled, user can't buy this food
            required: false, // Apply OUTER JOIN */

            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
            include: {
                model: Reviews,
                where: { status: 'active' },
                required: false,
                attributes: ['id', 'comment', 'rating'],
                include: {
                    model: User,
                    required: false,
                    attributes: ['id', 'name', 'email'],
                },
            },
        },
    })

    res.status(200).json({
        status: 'success',
        data: {
            meal,
        },
    })
})

// CRUD
const updateMealById = catchAsync(async (req, res, next) => {
    const { name, price } = req.body
    const { meal } = req

    await meal.update({ name, price })

    res.status(200).json({
        status: 'success',
        meal,
    })
})

// CRUD
const deleteMealById = catchAsync(async (req, res, next) => {
    const { meal } = req

    // Soft delete
    await meal.update({ status: 'deleted' })

    res.status(204).json({ status: 'success' })
})


module.exports = {
    createMeals,
    readActiveMeals,
    readActiveMealById,
    updateMealById,
    deleteMealById,
}
