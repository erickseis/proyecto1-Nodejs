const express = require('express')


//controllers
const {
    createRestaurant,
    readActiveRestaurants,
    readRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
} = require('../controllers/restaurants.controller')

//middlewares
const { restaurantIsActive } = require('../middlewares/restaurant.middlewares')

//auth middlewares
const {
    protectSession,
    protectAdmin
} = require('../middlewares/auth.middlewares')

//validators middlewares
const {
    createRestaurantValidators,
    updateRestaurantValidators
} = require('../middlewares/restaurantValidators.middlewares')

//creating router
const restaurantRouter = express.Router();


// Import reviews router
const { reviewsRouter } = require('./reviews.routes')

// Assigning end-points
restaurantRouter.get('/', readActiveRestaurants)
restaurantRouter.get('/:id', restaurantIsActive, readRestaurantById)

// Protecting endpoints
restaurantRouter.use(protectSession)

restaurantRouter.post('/', createRestaurantValidators, createRestaurant)

restaurantRouter.use('/reviews', reviewsRouter)

// Protecting endpoints to admin level
restaurantRouter.use(protectAdmin)

restaurantRouter.patch(
    '/:id',
    restaurantIsActive,
    updateRestaurantValidators,
    updateRestaurantById
)

restaurantRouter.delete('/:id', restaurantIsActive, deleteRestaurantById)


module.exports = { restaurantRouter }