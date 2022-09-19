// Models
const { Meals } = require('./meals.model')
const { Orders } = require('./orders.model');
const { Restaurants } = require('./restaurants.model');
const { Reviews } = require('./reviews.model');
const { User } = require('./user.model');


const initModels = () => {
	// 1 Restaurant <----> M Meal
	Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' })
	Meals.belongsTo(Restaurants)

	// 1 Restaurant <----> M Review
	Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' })
	Reviews.belongsTo(Restaurants)

	// 1 Meal <----> 1 Order
	Meals.hasOne(Orders, { foreignKey: 'mealId' })
	Orders.belongsTo(Meals)

	// 1 User <----> M Order
	User.hasMany(Orders, { foreignKey: 'userId' })
	Orders.belongsTo(User)

	// 1 User <----> M Review
	User.hasMany(Reviews, { foreignKey: 'userId' })
	Reviews.belongsTo(User)
};

module.exports = { initModels };
