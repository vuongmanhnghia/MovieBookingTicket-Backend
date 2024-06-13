"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Movie extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Movie.hasMany(models.Showtime, {
				foreignKey: "movieId",
			});
		}
	}
	Movie.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			genre: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			releaseDate: DataTypes.DATE,
			rating: DataTypes.FLOAT,
			director: DataTypes.STRING,
			image: DataTypes.BLOB("long"),
		},
		{
			sequelize,
			modelName: "Movie",
		}
	);
	return Movie;
};
