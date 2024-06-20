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
			showtimeId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			bookingDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			totalPrice: {
				allowNull: false,
				type: Sequelize.FLOAT,
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
