"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Bookings", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			phoneNumber: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			movieId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			cinemaId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			screenId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			time: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			date: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			totalTickets: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			totalPrice: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			bookingDate: {
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
		await queryInterface.dropTable("Bookings");
	},
};
