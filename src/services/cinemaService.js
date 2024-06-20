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
			let Cinemas = await db.Cinema.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			resolve({
				errCode: 0,
				data: Cinemas,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getCinemaDetail = (tradeMark) => {
	return new Promise(async (resolve, reject) => {
		if (!tradeMark) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			console.log(tradeMark);
			let data = [];
			let countData = await db.Cinema.findAll({
				where: { tradeMark: tradeMark },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			await countData.map(async (item, index) => {
				item.image = new Buffer.from(item.image, "base64").toString(
					"binary"
				);
				item.background = new Buffer.from(
					item.background,
					"base64"
				).toString("binary");
				data.push(item);
			});
			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllTradeMarks = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await db.Cinema.findAll({
				attributes: ["tradeMark"],
			});
			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllCinemaByTradeMark = (tradeMark) => {
	return new Promise(async (resolve, reject) => {
		if (!tradeMark) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Cinema.findAll({
				where: { tradeMark: tradeMark },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
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
	getAllTradeMarks: getAllTradeMarks,
	getAllCinemaByTradeMark: getAllCinemaByTradeMark,
};
