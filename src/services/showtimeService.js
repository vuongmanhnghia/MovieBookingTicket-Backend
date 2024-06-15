import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";
require("dotenv").config();

let createNewShowtime = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.arrShowtimes) {
				resolve({
					errCode: 1,
					errMessage: "Missing required parameter!",
				});
			}
			let arrShowtimes = data.arrShowtimes;
			let checkExist = await db.Showtime.findOne({
				where: {
					cinemaId: arrShowtimes[0].cinemaId,
					movieId: arrShowtimes[0].movieId,
					startDate: arrShowtimes[0].startDate,
					screenId: arrShowtimes[0].screenId,
					startTime: arrShowtimes[0].startTime,
				},
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Showtime is already exist!",
				});
			} else {
				await db.Showtime.bulkCreate(arrShowtimes);
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
