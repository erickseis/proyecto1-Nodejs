const { Orders } = require('../models/orders.model')
const { User } = require('../models/user.model')

const { catchAsync } = require('../utils/catchAsync.util')
const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Orders.findAll({
    attributes: [] //llegué hasta acá
  })
})