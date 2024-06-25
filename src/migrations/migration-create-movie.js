"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Movies", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			genre: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			duration: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			releaseDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			rating: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			director: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			image: {
				allowNull: false,
				type: Sequelize.BLOB("long"),
			},
			background: {
				allowNull: false,
				type: Sequelize.BLOB("long"),
			},
			trailer: {
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
		await queryInterface.dropTable("Movies");
	},
};
