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
		let nameMovie = req.query.name;
		if (!nameMovie) {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}

		let response = await movieService.getMovieDetail(nameMovie);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetMoviesPage = async (req, res) => {
	try {
		if (req.query.page && req.query.limit) {
			let page = req.query.page;
			let limit = req.query.limit;

			let response = await movieService.getMoviesPage(+page, +limit);
			return res.status(200).json(response);
		} else {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetReviewMoviesPage = async (req, res) => {
	try {
		if (req.query.page && req.query.limit) {
			let page = req.query.page;
			let limit = req.query.limit;

			let response = await movieService.getReviewMoviesPage(+page, +limit);
			return res.status(200).json(response);
		} else {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}
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
	handleGetMoviesPage: handleGetMoviesPage,
	handleGetReviewMoviesPage: handleGetReviewMoviesPage,
};
