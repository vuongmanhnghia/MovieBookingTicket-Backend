"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("BookingSeats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cinema: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			screen: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			date: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			time: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			seat: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			numberSeat: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			bookingDate: {
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
		await queryInterface.dropTable("BookingSeats");
	},
};
