// Models
const { Reviews } = require('../models/reviews.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const reviewIsActive = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const review = await Reviews.findOne({
        where: { id, status: 'active' },
    })

    // If review doesn't exist, send error message
    if (!review) {
        return next(new AppError('Review not found', 404))
    }

    // Adding review object to request
    req.review = review
    next()
})

module.exports = {
    reviewIsActive,
}
