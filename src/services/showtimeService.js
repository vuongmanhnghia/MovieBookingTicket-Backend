import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";
import { Model, where } from "sequelize";
import { at, result } from "lodash";
import e from "cors";
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
			await arrShowtimes.map(async (item) => {
				let checkExist = await db.Showtime.findOne({
					where: {
						tradeMarkId: item.tradeMarkId,
						cinemaId: item.cinemaId,
						startDate: item.startDate,
						screenId: item.screenId,
						startTime: item.startTime,
					},
				});

				if (checkExist) {
					resolve({
						errCode: 1,
						errMessage: "Showtime is already exist!",
					});
				} else {
					await db.Showtime.create({
						tradeMarkId: item.tradeMarkId,
						movieId: item.movieId,
						cinemaId: item.cinemaId,
						screenId: item.screenId,
						startDate: item.startDate,
						startTime: item.startTime,
					});
					resolve({
						errCode: 0,
						errMessage: "Create showtime success!",
					});
				}
			});
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

let getShowtimeByCinemaAndDate = (data) => {
	return new Promise(async (resolve, reject) => {
		if (!data || !data.name || !data.date) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let dataShowtime = await db.Showtime.findAll({
				where: {
					cinemaId: data.name,
					startDate: data.date,
				},
				attributes: {
					exclude: ["createdAt", "updatedAt", "id"],
				},
				raw: true,
			});
			if (dataShowtime.length === 0) {
				resolve({
					errCode: 2,
					errMessage: "Showtime is not exist!",
				});
			}

			let handleData = await dataShowtime.reduce((acc, item) => {
				if (!acc[item.movieId]) {
					acc[item.movieId] = [];
				}
				acc[item.movieId].push(item);
				return acc;
			}, {});

			let arrNameMovie = dataShowtime
				.map((item) => item.movieId)
				.filter((value, index, self) => self.indexOf(value) === index);
			data = [];
			for (let i = 0; i < arrNameMovie.length; i++) {
				let result = {};

				let dataMovie = await db.Movie.findOne({
					where: { title: arrNameMovie[i] },
					attributes: ["title", "image", "genre"],
					raw: true,
				});
				dataMovie.image = new Buffer.from(
					dataMovie.image,
					"base64"
				).toString("binary");
				result.movie = dataMovie;
				result.showtime = handleData[arrNameMovie[i]];
				data.push(result);
			}

			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getShowtimeByCinemaAndDateAndMovie = (data) => {
	return new Promise(async (resolve, reject) => {
		if (
			!data ||
			!data.nameMovie ||
			!data.dateSelected ||
			!data.tradeMarkSelected
		) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let dataShowtime = await db.Showtime.findAll({
				where: {
					movieId: data.nameMovie,
					tradeMarkId: data.tradeMarkSelected,
					startDate: data.dateSelected,
				},
				attributes: {
					exclude: ["createdAt", "updatedAt", "id"],
				},
				raw: true,
			});
			if (dataShowtime.length === 0) {
				resolve({
					errCode: 2,
					errMessage: "Showtime is not exist!",
				});
			}

			let handleData = await dataShowtime.reduce((acc, item) => {
				if (!acc[item.cinemaId]) {
					acc[item.cinemaId] = [];
				}
				acc[item.cinemaId].push(item);
				return acc;
			}, {});
			let arrCinema = dataShowtime
				.map((item) => item.cinemaId)
				.filter((value, index, self) => self.indexOf(value) === index);
			data = [];
			for (let i = 0; i < arrCinema.length; i++) {
				let result = {};
				let dataCinema = await db.Cinema.findOne({
					where: { name: arrCinema[i] },
					attributes: ["name", "location"],
					raw: true,
				});
				result.cinema = dataCinema;
				result.showtime = handleData[arrCinema[i]];
				data.push(result);
			}
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
	createNewShowtime: createNewShowtime,
	getShowtimeByCinema: getShowtimeByCinema,
	getSeatsByShowtime: getSeatsByShowtime,
	getShowtimeByCinemaAndDate: getShowtimeByCinemaAndDate,
	getShowtimeByCinemaAndDateAndMovie: getShowtimeByCinemaAndDateAndMovie,
};
