//Models
const { Orders } = require('../models/orders.model')
const { Meals } = require('../models/meals.model')
const { Restaurants } = require('../models/restaurants.model')


//utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

//this middleware
const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const userId = req.sessionUser.id

  const order = await Orders.findOne({
    where: { id, userId },
    attributes: ['id', 'totalPrice', 'quantity', 'status'],
    include: {
      model: Meals,
      attributes: ['id', 'name', 'price', 'status'],
      include: {
        model: Restaurants,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  })

  // If user doesn't exist, send error message
  if (!order) {
    return next(new AppError('Order not found', 404))
  }

  // Adding order object to request
  req.order = order
  next()
})

const orderIsActive = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Orders.findOne({
    where: { id, status: 'active' },
    // attributes: {},
  })

  // If user doesn't exist, send error message
  if (!order) {
    return next(new AppError('Order not found', 404))
  }

  // Adding order object to request
  req.order = order
  next()
})

module.exports = {
  orderExists,
  orderIsActive
}
