import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";

let createNewScreen = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Screen.findOne({
				where: {
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

module.exports = {
	createNewScreen: createNewScreen,
};
