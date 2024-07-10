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
		let tradeMark = req.query.id;
		let response = await cinemaService.getCinemaDetail(tradeMark);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetAllTradeMarks = async (req, res) => {
	try {
		let response = await cinemaService.getAllTradeMarks();
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetAllCinemaByTradeMark = async (req, res) => {
	try {
		let tradeMark = req.query.tradeMark;
		let response = await cinemaService.getAllCinemaByTradeMark(tradeMark);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetTradeMarkByCinema = async (req, res) => {
	try {
		let cinemaName = req.query.name;
		let response = await cinemaService.getTradeMarkByCinema(cinemaName);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

let handleGetDetailTradeMark = async (req, res) => {
	let tradeMark = req.query.name;
	let response = await cinemaService.getDetailTradeMark(tradeMark);
	return res.status(200).json(response);
};

module.exports = {
	handleCreateNewCinema: handleCreateNewCinema,
	handleDeleteCinema: handleDeleteCinema,
	handleGetAllCinemas: handleGetAllCinemas,
	handleGetDetailCinema: handleGetDetailCinema,
	handleGetAllTradeMarks: handleGetAllTradeMarks,
	handleGetAllCinemaByTradeMark: handleGetAllCinemaByTradeMark,
	handleGetTradeMarkByCinema: handleGetTradeMarkByCinema,
	handleGetDetailTradeMark: handleGetDetailTradeMark,
};
