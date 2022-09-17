const { Orders } = require('../models/orders.model')
const { User } = require('../models/user.model')
const { catchAsync } = require('../utils/catchAsync.util')


const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, meal } = req.body;

  const newOrder = await Orders.create({
    meal,
    quantity
  })
  res.status(201).json({
    status: 'success',
    data: { newOrder }
  })
})





// const getAllOrders = catchAsync(async (req, res, next) => {
//   const { quantity, meal } = req.body
//   const orders = await Orders.findAll({
//     attributes: []
//   })
// })

module.exports = { createOrder }