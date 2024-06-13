import cinemaService from "../services/cinemaService";

let handleCreateNewCinema = async (req, res) => {
	let message = await cinemaService.createNewCinema(req.body);
	return res.status(200).json(message);
};

let handleDeleteCinema = async (req, res) => {
	if (!req.body.name) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter! Please check again!",
		});
	}

	let message = await cinemaService.deleteCinema(req.body.name);
	return res.status(200).json(message);
};

let handleGetAllCinemas = async (req, res) => {
	try {
		let response = await cinemaService.getAllCinemas();
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetDetailCinema = async (req, res) => {
	try {
		let CinemaId = req.query.id;
		if (!CinemaId) {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}

		let response = await cinemaService.getCinemaDetail(CinemaId);
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
	handleCreateNewCinema: handleCreateNewCinema,
	handleDeleteCinema: handleDeleteCinema,
	handleGetAllCinemas: handleGetAllCinemas,
	handleGetDetailCinema: handleGetDetailCinema,
};
