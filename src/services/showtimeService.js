import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";
import { Model, where } from "sequelize";
import { at } from "lodash";
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
					tradeMarkId: arrShowtimes[0].tradeMarkId,
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

let getShowtimeByCinema = (name) => {
	return new Promise(async (resolve, reject) => {
		if (!name) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Showtime.findAll({
				where: { cinemaId: name },
				attributes: ["movieId", "startDate", "startTime", "screenId"],
				raw: true,
			});
			if (data.length === 0) {
				resolve({
					errCode: 1,
					errMessage: "Cinema is not showtime!",
				});
				return;
			}
			let nameMovie = data[0].movieId;
			let arrResult = [];
			for (let i = 0; i < data.length; i++) {
				if (i > 0 && nameMovie === data[i].movieId) {
					continue;
				}
				nameMovie = data[i].movieId;
				let result = {};

				let dataMovie = await db.Movie.findOne({
					where: { title: nameMovie },
					attributes: ["title", "image", "genre"],
					raw: true,
				});
				dataMovie.image = new Buffer.from(
					dataMovie.image,
					"base64"
				).toString("binary");
				result.movie = dataMovie;
				let dataShowtime = data.filter(
					(item) => item.movieId === nameMovie
				);
				result.showtime = dataShowtime;
				arrResult.push(result);
			}
			resolve({
				errCode: 0,
				data: arrResult,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getSeatsByShowtime = (data) => {
	return new Promise(async (resolve, reject) => {
		if (!data.tradeMarkId || !data.cinemaId || !data.screenId) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let dataSeats = await db.Screen.findOne({
				where: {
					tradeMarkId: data.tradeMarkId,
					cinemaId: data.cinemaId,
					name: data.screenId,
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				raw: true,
			});
			if (!dataSeats) {
				resolve({
					errCode: 2,
					errMessage: "Showtime is not exist!",
				});
			}
			resolve({
				errCode: 0,
				data: dataSeats,
			});
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
	getShowtimeByCinema: getShowtimeByCinema,
	getSeatsByShowtime: getSeatsByShowtime,
	// getShowtimeDetail: getShowtimeDetail,
};
