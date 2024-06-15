// name: DataTypes.STRING,
// location: DataTypes.STRING,
// rating: DataTypes.FLOAT,
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Cinemas", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tradeMark: {
				allowNull: false,
				type: Sequelize.STRING,
			},

			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			location: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			rating: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},

			image: {
				allowNull: false,
				type: Sequelize.BLOB("long"),
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
		await queryInterface.dropTable("Cinemas");
	},
};
