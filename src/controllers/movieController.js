import movieService from "../services/movieService";

let handleCreateNewMovie = async (req, res) => {
	let message = await movieService.createNewMovie(req.body);
	return res.status(200).json(message);
};

let handleDeleteMovie = async (req, res) => {
	if (!req.body.title) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter! Please check again!",
		});
	}

	let message = await movieService.deleteMovie(req.body.title);
	return res.status(200).json(message);
};

let handleGetTopMovies = async (req, res) => {
	let limit = req.query.limit;
	if (!limit) {
		limit = 10;
	}
	try {
		let response = await movieService.getTopMovies(+limit);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetAllMovies = async (req, res) => {
	try {
		let response = await movieService.getAllMovies();
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetDetailMovie = async (req, res) => {
	try {
		let movieId = req.query.id;
		if (!movieId) {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}

		let response = await movieService.getMovieDetail(movieId);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

module.exports = {
	handleCreateNewMovie: handleCreateNewMovie,
	handleDeleteMovie: handleDeleteMovie,
	handleGetTopMovies: handleGetTopMovies,
	handleGetAllMovies: handleGetAllMovies,
	handleGetDetailMovie: handleGetDetailMovie,
};
