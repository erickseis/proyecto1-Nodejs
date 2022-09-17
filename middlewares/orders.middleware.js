const { Orders } = require('../models/orders.model')
const { catchAsync } = require('../utils/catchAsync.util')

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({ where: { id } })

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found'
    })
  }

  req.order = order;
  next()
})

module.exports = { orderExists }