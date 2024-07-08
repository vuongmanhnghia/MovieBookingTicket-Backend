"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	Booking.init(
		{
			fullName: DataTypes.STRING,
			email: DataTypes.STRING,
			phoneNumber: DataTypes.INTEGER,
			movieId: DataTypes.STRING,
			cinemaId: DataTypes.STRING,
			screenId: DataTypes.INTEGER,
			time: DataTypes.STRING,
			date: DataTypes.STRING,
			totalTickets: DataTypes.INTEGER,
			totalPrice: DataTypes.FLOAT,
			bookingDate: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Booking",
		}
	);
	return Booking;
};
