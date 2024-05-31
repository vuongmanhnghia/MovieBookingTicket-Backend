"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				email: "vuongmanhnghia@gmail.com",
				password: "Vmn.2005",
				fullName: "Vuong Manh Nghia",
				phoneNumber: "0375992059",
				address: "Hanoi",
				gender: 1,
				typeRole: "ROLE",
				keyRole: "R1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
