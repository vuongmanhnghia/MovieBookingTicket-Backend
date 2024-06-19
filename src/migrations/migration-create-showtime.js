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
			movieId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			tradeMarkId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			screenId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			cinemaId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			startDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			startTime: {
				allowNull: false,
				type: Sequelize.STRING,
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
