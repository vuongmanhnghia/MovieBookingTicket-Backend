import db from "../models/index";

let getTopMoviesHome = (limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			let movies = await db.Movie.findAll({
				limit: limit,
				order: [["id", "DESC"]],
			});
			//raw: true
			resolve({
				errCode: 0,
				data: movies,
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	getTopMoviesHome: getTopMoviesHome,
};
