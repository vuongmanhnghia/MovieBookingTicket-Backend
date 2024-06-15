// import { raw } from "body-parser";

import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";

let checkExist = (name) => {
	return new Promise(async (resolve, reject) => {
		try {
			let Cinema = await db.Cinema.findOne({
				where: { name: name },
			});
			if (Cinema) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

let createNewCinema = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Cinema.findOne({
				where: { name: data.name },
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Cinema is already exist!",
				});
			} else {
				await db.Cinema.create({
					tradeMark: data.tradeMark,
					name: data.name,
					location: data.location,
					rating: data.rating,
					image: data.image,
					background: data.background,
				});
				resolve({
					errCode: 0,
					errMessage: "Create Cinema success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let deleteCinema = (name) => {
	return new Promise(async (resolve, reject) => {
		try {
			let Exits = await checkExist(name);
			if (!Exits) {
				resolve({
					errCode: 2,
					errMessage: "Cinema not found!",
				});
			} else {
				await db.Cinema.destroy({
					where: { name: name },
				});
				resolve({
					errCode: 0,
					errMessage: "Delete Cinema success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllCinemas = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let Cinemas = await db.Cinema.findAll({});
			resolve({
				errCode: 0,
				data: Cinemas,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getCinemaDetail = (id) => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Cinema.findOne({
				where: { id: id },
			});
			let screen = await db.Screen.findAll({
				where: { cinemaId: id },
			});
			data.screen = screen;
			console.log(data);
			// if (data && data.image) {
			// 	data.image = new Buffer.from(data.image, "base64").toString(
			// 		"binary"
			// 	);
			// } else {
			// 	resolve({
			// 		errCode: 2,
			// 		errMessage: "Cinema not found!",
			// 	});
			// }
			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewCinema: createNewCinema,
	deleteCinema: deleteCinema,
	getAllCinemas: getAllCinemas,
	getCinemaDetail: getCinemaDetail,
};
