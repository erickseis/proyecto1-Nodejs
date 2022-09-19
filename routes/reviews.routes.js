const express = require('express')

// Controllers reviews
const {
    createRestaurantReview,
    updateReviewById,
    deleteReviewById,
} = require('../controllers/reviews.controller')

// Middlewares
const { restaurantIsActive } = require('../middlewares/restaurant.middlewares')
const { reviewIsActive } = require('../middlewares/reviews.middlewares')

// Auth middlewares
const { protectReviewOwner } = require('../middlewares/auth.middlewares')

// Validators middlewares
const {
    reviewValidators,
} = require('../middlewares/reviewsValidators.middlewares')

// Creating router
const reviewsRouter = express.Router()

reviewsRouter.post(
    '/:restaurantId',
    restaurantIsActive,
    reviewValidators,
    createRestaurantReview
)

reviewsRouter.patch(
    '/:id',
    reviewIsActive,
    reviewValidators,
    protectReviewOwner,
    updateReviewById
)

reviewsRouter.delete(
    '/:id',
    reviewIsActive,
    protectReviewOwner,
    deleteReviewById
)

module.exports = { reviewsRouter }
