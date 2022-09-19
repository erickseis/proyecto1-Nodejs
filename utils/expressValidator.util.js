const { body, validationResult } = require('express-validator')
const { AppError } = require('../utils/appError.util')

const checkValidations = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)

        const message = errorMessages.join('. ')

        return next(new AppError(message, 400))
    }

    next()
}

module.exports = { checkValidations, body }
