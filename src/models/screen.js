"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Screen extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Screen.belongsTo(models.Cinema, {
				foreignKey: "cinemaId",
			});
			Screen.hasMany(models.Showtime, {
				foreignKey: "screenId",
			});
			Screen.hasMany(models.Seat, {
				foreignKey: "screenId",
			});
		}
	}
	Screen.init(
		{
			cinemaId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			totalSeats: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Screen",
		}
	);
	return Screen;
};
