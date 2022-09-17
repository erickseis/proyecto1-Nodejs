// Models
const { User } = require('./user.model');
const { Reviews } = require('./reviews.model');
const { Restaurants } = require('./restaurants.model');
const { Orders } = require('./orders.model');
const { Meals } = require('./meals.model')


const initModels = () => {
	// 1 User <----> M Post
	Restaurants.hasMany(Reviews, { foreignKey: 'id' });
	Reviews.hasMany(User, { foreignKey: 'userId' });



	// 1 User <----> M Post
	User.hasMany(Orders, { foreignKey: 'id' });
	Orders.belongsTo(Meals, { foreignKey: 'mealId' });


	Meals.hasMany(Restaurants, { foreignKey: 'restaurantId' });



	// // 1 User <----> M Post
	// User.hasMany(Post, { foreignKey: 'userId' });
	// Post.belongsTo(User);
	// // 1 User <----> M Post
	// User.hasMany(Post, { foreignKey: 'userId' });
	// Post.belongsTo(User);











	// 1 Post <----> M Comment
	// Post.hasMany(Comment, { foreignKey: 'postId' });
	// Comment.belongsTo(Post);

	// // 1 User <----> M Comment
	// User.hasMany(Comment, { foreignKey: 'userId' });
	// Comment.belongsTo(User);
};

module.exports = { initModels };
