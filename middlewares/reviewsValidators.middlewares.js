const { checkValidations, body } = require('../utils/expressValidator.util')

const reviewValidators = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .isLength({ min: 3 })
        .withMessage('Comment must be at least 3 characters'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be a integer from 1 to 5'),
    checkValidations,
]

module.exports = { reviewValidators }
