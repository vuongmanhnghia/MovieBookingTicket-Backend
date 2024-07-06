import showtimeService from "../services/showtimeService";

let handleCreateNewShowtime = async (req, res) => {
	let message = await showtimeService.createNewShowtime(req.body);
	return res.status(200).json(message);
};

let handleGetShowtimeByCinema = async (req, res) => {
	let message = await showtimeService.getShowtimeByCinema(req.query.name);
	return res.status(200).json(message);
};

let handleGetSeatsByShowtime = async (req, res) => {
	let message = await showtimeService.getSeatsByShowtime(req.body);
	return res.status(200).json(message);
};

let handleGetShowtimeByCinemaAndDate = async (req, res) => {
	let message = await showtimeService.getShowtimeByCinemaAndDate(req.query);
	return res.status(200).json(message);
};

let handleGetShowtimeByCinemaAndDateAndMovie = async (req, res) => {
	let message = await showtimeService.getShowtimeByCinemaAndDateAndMovie(
		req.query
	);
	return res.status(200).json(message);
};

module.exports = {
	handleCreateNewShowtime: handleCreateNewShowtime,
	handleGetShowtimeByCinema: handleGetShowtimeByCinema,
	handleGetSeatsByShowtime: handleGetSeatsByShowtime,
	handleGetShowtimeByCinemaAndDate: handleGetShowtimeByCinemaAndDate,
	handleGetShowtimeByCinemaAndDateAndMovie:
		handleGetShowtimeByCinemaAndDateAndMovie,
};
