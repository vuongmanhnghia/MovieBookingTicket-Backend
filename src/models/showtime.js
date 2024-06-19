"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Showtime extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Showtime.belongsTo(models.Cinema, {
				foreignKey: "cinemaId",
			});
			Showtime.belongsTo(models.Movie, {
				foreignKey: "movieId",
			});
			Showtime.belongsTo(models.Screen, {
				foreignKey: "screenId",
			});
		}
	}
	Showtime.init(
		{
			movieId: DataTypes.STRING,
			tradeMarkId: DataTypes.STRING,
			screenId: DataTypes.INTEGER,
			cinemaId: DataTypes.STRING,
			startDate: DataTypes.DATE,
			startTime: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Showtime",
		}
	);
	return Showtime;
};
