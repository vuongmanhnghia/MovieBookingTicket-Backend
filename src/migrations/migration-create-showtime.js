"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Showtimes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			// movieId: DataTypes.INTEGER,
			// screenId: DataTypes.INTEGER,
			// startTime: DataTypes.DATE,
			// endTime: DataTypes.DATE,

			movieId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			screenId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			startTime: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			endTime: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Showtimes");
	},
};
