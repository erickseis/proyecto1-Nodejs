const { checkValidations, body } = require('../utils/expressValidator.util')

const createRestaurantValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .isLength({ min: 8 })
        .withMessage('Address must be at least 8 characters'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be a integer from 1 to 5'),
    checkValidations,
]

const updateRestaurantValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .isLength({ min: 8 })
        .withMessage('Address must be at least 8 characters'),
    checkValidations,
]

module.exports = { createRestaurantValidators, updateRestaurantValidators }
