import { raw } from "body-parser";
import db from "../models/index";
import { resolveInclude } from "ejs";
import { Model, where } from "sequelize";

let checkExist = (title) => {
	return new Promise(async (resolve, reject) => {
		try {
			let movie = await db.Movie.findOne({
				where: { title: title },
			});
			if (movie) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

let createNewMovie = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Movie.findOne({
				where: { title: data.title },
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Movie is already exist!",
				});
			} else {
				await db.Movie.create({
					title: data.title,
					description: data.description,
					genre: data.genre,
					duration: data.duration,
					releaseDate: data.releaseDate,
					rating: data.rating,
					director: data.director,
					image: data.image,
					background: data.background,
					trailer: data.trailer,
				});
				resolve({
					errCode: 0,
					errMessage: "Create movie success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let deleteMovie = (title) => {
	return new Promise(async (resolve, reject) => {
		try {
			let Exits = await checkExist(title);
			if (!Exits) {
				resolve({
					errCode: 2,
					errMessage: "Movie not found!",
				});
			} else {
				await db.Movie.destroy({
					where: { title: title },
				});
				resolve({
					errCode: 0,
					errMessage: "Delete movie success!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getTopMovies = (limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			let movies = await db.Movie.findAll({
				limit: limit,
				order: [["createdAt", "DESC"]],
				attributes: {
					exclude: ["createdAt", "updatedAt", "background"],
				},
				// raw: true;
			});
			movies.map((item) => {
				item.image = new Buffer.from(item.image, "base64").toString(
					"binary"
				);
			});
			resolve({
				errCode: 0,
				data: movies,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllMovies = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let movies = await db.Movie.findAll({});

			movies.map((item) => {
				item.image = new Buffer.from(item.image, "base64").toString(
					"binary"
				);
				item.background = new Buffer.from(
					item.background,
					"base64"
				).toString("binary");
			});
			resolve({
				errCode: 0,
				data: movies,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getMovieDetail = (nameMovie) => {
	return new Promise(async (resolve, reject) => {
		if (!nameMovie) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Movie.findOne({
				where: { title: nameMovie },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				raw: true,
			});
			let showtimeData = await db.Showtime.findAll({
				where: { movieId: data.title },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			data.showtimeData = showtimeData;
			if (data && data.image && data.background) {
				data.image = new Buffer.from(data.image, "base64").toString(
					"binary"
				);
				data.background = new Buffer.from(
					data.background,
					"base64"
				).toString("binary");
			} else {
				resolve({
					errCode: 2,
					errMessage: "Movie not found!",
				});
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

let getMoviesPage = (page, limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			let offset = (page - 1) * limit;
			let { count, rows } = await db.Movie.findAndCountAll({
				offset: offset,
				limit: limit,

				order: [["createdAt", "DESC"]],
				attributes: {
					exclude: ["createdAt", "updatedAt", "background"],
				},
			});

			rows.map((item) => {
				item.image = new Buffer.from(item.image, "base64").toString(
					"binary"
				);
			});

			let data = {
				totalPage: Math.ceil(count / limit),
				totalRows: count,
				movies: rows,
			};
			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getReviewMoviesPage = (page, limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			let offset = (page - 1) * limit;
			let { count, rows } = await db.Movie.findAndCountAll({
				offset: offset,
				limit: limit,
				order: [["createdAt", "DESC"]],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});

			rows.map((item) => {
				item.image = new Buffer.from(item.image, "base64").toString(
					"binary"
				);
				item.background = new Buffer.from(
					item.background,
					"base64"
				).toString("binary");
			});

			let data = {
				totalPage: Math.ceil(count / limit),
				totalRows: count,
				movies: rows,
			};
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
	createNewMovie: createNewMovie,
	deleteMovie: deleteMovie,
	getTopMovies: getTopMovies,
	getAllMovies: getAllMovies,
	getMovieDetail: getMovieDetail,
	getMoviesPage: getMoviesPage,
	getReviewMoviesPage: getReviewMoviesPage,
};
