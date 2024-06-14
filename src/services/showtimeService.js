import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";

let createNewShowtime = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Showtime.findOne({
				where: {
					movieId: data.movieId,
					screenId: data.screenId,
					cinemaId: data.cinemaId,
					startTime: data.startTime,
				},
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Showtime is already exist!",
				});
			} else {
				await db.Showtime.create({
					movieId: data.movieId,
					screenId: data.screenId,
					cinemaId: data.cinemaId,
					startTime: data.startTime,
				});
				resolve({
					errCode: 0,
					errMessage: "Create showtime success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

// let getShowtimeDetail = (cinemaId) => {
// 	return new Promise(async (resolve, reject) => {
// 		if (!cinemaId) {
// 			resolve({
// 				errCode: 1,
// 				errMessage: "Missing required parameter!",
// 			});
// 		}
// 		try {
// 			let data = await db.Showtime.findAll({
// 				where: { cinemaId: cinemaId },
// 				raw: true,
// 			});
// 			resolve({
// 				errCode: 0,
// 				data: data,
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

module.exports = {
	createNewShowtime: createNewShowtime,
	// getShowtimeDetail: getShowtimeDetail,
};
