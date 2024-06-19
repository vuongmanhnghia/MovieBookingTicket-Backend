// import { raw } from "body-parser";

import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";

let createNewSeat = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Seat.findOne({
				where: { cinemaId: data.cinemaId, screenId: data.screenId },
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Seat is already exist!",
				});
			} else {
				await db.Seat.create({
					cinemaId: data.cinemaId,
					screenId: data.screenId,
					seatNumber: data.seatNumber,
				});
				resolve({
					errCode: 0,
					errMessage: "Create Seat success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewSeat: createNewSeat,
};
