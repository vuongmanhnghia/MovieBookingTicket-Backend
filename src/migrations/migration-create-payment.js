"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Payments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			bookingId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			paymentMethod: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			paymentStatus: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			amount: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			paymentDate: {
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
		await queryInterface.dropTable("Payments");
	},
};
