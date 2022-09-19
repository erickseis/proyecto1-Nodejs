const { checkValidations, body } = require('../utils/expressValidator.util')

const createMealValidators = [
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a integer.'),
    body('mealId').isInt({ min: 1 }).withMessage('MealId must be a integer.'),
    checkValidations,
]

module.exports = { createMealValidators }
