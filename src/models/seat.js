"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Seat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Seat.belongsTo(models.Cinema, {
				foreignKey: "cinemaId",
			});
			Seat.belongsTo(models.Screen, {
				foreignKey: "screenId",
			});
		}
	}
	Seat.init(
		{
			cinemaId: DataTypes.STRING,
			screenId: DataTypes.INTEGER,
			seatNumber: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Seat",
		}
	);
	return Seat;
};
