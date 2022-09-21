const express = require('express')

// Controllers
const {
    createMeals,
    readActiveMeals,
    readActiveMealById,
    updateMealById,
    deleteMealById
} = require('../controllers/meals.controllers')

//middlewares
const { mealExists } = require('../middlewares/meals.middlewares')
const { restaurantIsActive } = require('../middlewares/restaurant.middlewares')

//Auth middlewares
const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares')

// validators middlewares

const { mealValidators } = require('../middlewares/mealsValidators.middlewares')

//creating router
const mealsRouter = express.Router();

// Assigning end-points
mealsRouter.get('/', readActiveMeals)
mealsRouter.get('/:id', mealExists, readActiveMealById)

// Protecting endpoints
mealsRouter.use(protectSession)

// Protecting endpoints to admin level
mealsRouter.use(protectAdmin)
mealsRouter.post('/:id', restaurantIsActive, mealValidators, createMeals)
mealsRouter.patch('/:id', mealExists, mealValidators, updateMealById)
mealsRouter.delete('/:id', mealExists, deleteMealById)
mealsRouter.post('/:id', createMeals)


















module.exports = { mealsRouter }