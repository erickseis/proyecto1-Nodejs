const express = require('express')

//Controller
const {
    createOrder,
    readOrdersByUser,
    updateOrder,
    deletOrder
} = require('../controllers/orders.controller')

//middlewares
const { orderExists } = require('../middlewares/orders.middleware')

//auth middlewares
const {
    protectSession,
    protectOrderOwner
} = require('../middlewares/auth.middlewares')

//Validators middlewares
const {
    createMealValidators
} = require('../middlewares/orderValidator.middleware')

//creating router
const orderRouter = express.Router();

//protecting endpoints
orderRouter.use(protectSession)
orderRouter.post('/', createMealValidators, createOrder)
orderRouter.get('/me', readOrdersByUser)
orderRouter.patch('/:id', orderExists, protectOrderOwner, updateOrder)
orderRouter.delete('/:id', orderExists, protectOrderOwner, deletOrder)

module.exports = { orderRouter }