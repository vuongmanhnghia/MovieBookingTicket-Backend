import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassordFromBcrypt = await hashUserPassword(data.password);
			await db.User.create({
				email: data.email,
				password: hashPassordFromBcrypt,
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				dateOfBirth: data.dateOfBirth,
				gender: data.gender === "1" ? true : false,
				address: data.address,
				roleId: data.roleId,
			});
			resolve("Create new user success");
		} catch (e) {
			reject(e);
		}
	});
};

let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassord = await bcrypt.hashSync(password, salt);
			resolve(hashPassord);
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = db.User.findAll({
				raw: true,
			});
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let getUserInfoById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id: userId },
				raw: true,
			});

			if (user) {
				resolve(user);
			} else {
				resolve({});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let updateUserData = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: { id: data.id },
			});
			if (user) {
				user.fullName = data.fullName;
				user.phoneNumber = data.phoneNumber;
				user.address = data.address;
				user.gender = data.gender === "1" ? true : false;

				await user.save();

				let allUsers = await db.User.findAll();
				resolve(allUsers);
			} else {
				resolve("Cannot find user");
			}
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	createNewUser: createNewUser,
	getAllUser: getAllUser,
	getUserInfoById: getUserInfoById,
	updateUserData: updateUserData,
};
