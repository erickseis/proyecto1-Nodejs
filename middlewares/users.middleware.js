//models
const { User } = require('../models/user.model')

//utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  })

  // If user doesn't exist, send error message
  if (!user) {
    return next(new AppError('User not found', 404))
  }

  // Adding user object to request
  req.user = user
  next()
})

module.exports = {
  userExists,
}
