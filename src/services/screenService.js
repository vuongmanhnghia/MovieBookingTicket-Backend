import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";

let createNewScreen = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Screen.findOne({
				where: {
					tradeMarkId: data.tradeMarkId,
					cinemaId: data.cinemaId,
					name: data.name,
				},
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Screen is already exist!",
				});
			} else {
				await db.Screen.create({
					tradeMarkId: data.tradeMarkId,
					cinemaId: data.cinemaId,
					name: data.name,
					totalSeats: data.totalSeats,
				});
				resolve({
					errCode: 0,
					errMessage: "Create screen success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getScreenDetail = (cinemaId) => {
	return new Promise(async (resolve, reject) => {
		if (!cinemaId) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Screen.findAll({
				where: { cinemaId: cinemaId },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				raw: true,
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
	createNewScreen: createNewScreen,
	getScreenDetail: getScreenDetail,
};
