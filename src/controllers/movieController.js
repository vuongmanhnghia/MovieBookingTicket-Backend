import movieService from "../services/movieService";

let getTopMovieHome = async (req, res) => {
	let limit = req.query.limit;
	if (!limit) {
		limit = 10;
	}
	try {
		let movies = await movieService.getTopMoviesHome(limit);
		return res.statsus(200).json(movies);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: "Error from server...",
		});
	}
};

module.exports = {
	getTopMovieHome: getTopMovieHome,
};
