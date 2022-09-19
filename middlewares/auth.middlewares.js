const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/user.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

dotenv.config()

const protectSession = catchAsync(async (req, res, next) => {
    // Get token
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Extract token
        token = req.headers.authorization.slice(7)
    }

    // Check if the token was sent or not
    if (!token) {
        return next(new AppError('Invalid session', 403))
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Verify the token's owner
    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    })

    if (!user) {
        return next(
            new AppError('The owner of the session is no longer active', 403)
        )
    }

    // Grant access
    req.sessionUser = user
    next()
})

const protectAdmin = (req, res, next) => {
    const { sessionUser } = req

    if (sessionUser.role !== 'admin') {
        return next(
            new AppError('You do not have the access level for this data.', 403)
        )
    }

    next()
}

const protectUsersAccount = (req, res, next) => {
    const { sessionUser, user } = req

    // If the users (ids) don't match, send an error
    if (sessionUser.id !== user.id) {
        return next(new AppError('You are not the owner of this account.', 403))
    }

    // If the ids match, grant access
    next()
}

const protectOrderOwner = (req, res, next) => {
    const { sessionUser, order } = req

    if (sessionUser.id !== order.userId) {
        return next(new AppError('This order does not belong to you.', 403))
    }

    next()
}

const protectReviewOwner = (req, res, next) => {
    const { sessionUser, review } = req

    if (sessionUser.id !== review.userId) {
        return next(new AppError('This review does not belong to you.', 403))
    }

    next()
}

module.exports = {
    protectSession,
    protectUsersAccount,
    protectOrderOwner,
    protectAdmin,
    protectReviewOwner,
}
