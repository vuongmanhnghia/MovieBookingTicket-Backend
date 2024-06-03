import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};

			let isExits = await checkUserEmail(email);
			if (isExits) {
				let user = await db.User.findOne({
					attributes: ["email", "roleId", "password"],
					where: { email: email },
					raw: true,
				});
				if (user) {
					let check = await bcrypt.compareSync(password, user.password); // false

					if (check) {
						delete user.password;
						userData.errCode = 0;
						userData.errMessage = `Ok`;
						userData.user = user;
					} else {
						userData.errCode = 3;
						userData.errMessage = `Wrong password`;
					}
				} else {
					userData.errCode = 2;
					userData.errMessage = `User's not found`;
				}
			} else {
				userData.errCode = 1;
				userData.errMessage = `User's email isn't exist`;
			}
			console.log(userData);
			resolve(userData);
		} catch (error) {
			reject(error);
		}
	});
};

let checkUserEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { email: email },
			});
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (error) {
			reject(error);
		}
	});
};

let getAllUsers = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";
			if (userId === "ALL") {
				users = await db.User.findAll({
					attributes: {
						exclude: ["password"],
					},
				});
			}
			if (userId && userId !== "ALL") {
				users = await db.User.findOne({
					where: { id: userId },
					attributes: {
						exclude: ["password"],
					},
				});
			}
			console.log(users);
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
};
