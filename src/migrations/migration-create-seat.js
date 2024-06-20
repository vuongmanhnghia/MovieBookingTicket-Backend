"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Seats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cinemaId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			screenId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			priceSeats: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			seatNumber: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Seats");
	},
};
