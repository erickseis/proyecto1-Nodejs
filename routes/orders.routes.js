const express = require('express')

const { createOrder } = require('../controllers/orders.controller')
const { orderExists } = require('../middlewares/orders.middleware')


const orderRouter = express.Router();

orderRouter.post('/', createOrder)
orderRouter.patch('/:id', orderExists)


module.exports = { orderRouter }