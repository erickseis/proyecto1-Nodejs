//models
const { Meals } = require('../models/meals.model')

//utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')


const mealExists = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const meal = await Meal.findOne({
        where: { id, status: 'active' },
    })

    // If user doesn't exist, send error message
    if (!meal) {
        return next(new AppError('Meal not found', 404))
    }

    // Adding meal object to request
    req.meal = meal
    next()
})

module.exports = { mealExists }