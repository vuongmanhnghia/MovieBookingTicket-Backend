import { raw } from "body-parser";
import db from "../models/index";

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
					release_date: data.release_date,
					rating: data.rating,
					direction: data.direction,
					image: data.image,
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
				// raw: true;
			});
			console.log(movies);
			resolve({
				errCode: 0,
				data: movies,
			});
		} catch (e) {
			reject(e);
		}
	});
	// return new Promise(async (resolve, reject) => {
	// 	try {
	// 		let movies = await db.Movie.findAll({
	// 			limit: limit,
	// 			order: [["id", "DESC"]],
	// 		});
	// 		//raw: true
	// 		resolve({
	// 			errCode: 0,
	// 			data: movies,
	// 		});
	// 	} catch (e) {
	// 		reject(e);
	// 	}
	// });
};

module.exports = {
	createNewMovie: createNewMovie,
	deleteMovie: deleteMovie,
	getTopMovies: getTopMovies,
};
