"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class BookingSeat extends Model {
		static associate(models) {}
	}
	BookingSeat.init(
		{
			cinema: DataTypes.STRING,
			screen: DataTypes.STRING,
			date: DataTypes.STRING,
			time: DataTypes.STRING,
			seat: DataTypes.STRING,
			numberSeat: DataTypes.INTEGER,
			bookingDate: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "BookingSeat",
		}
	);
	return BookingSeat;
};
