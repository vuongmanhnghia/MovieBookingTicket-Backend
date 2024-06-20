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

// let handleGetDetailShowtime = async (req, res) => {
// 	try {
// 		let ShowtimeId = req.query.cinemaId;
// 		if (!ShowtimeId) {
// 			return res.status(200).json({
// 				errCode: 3,
// 				errMessage: "Missing parameter",
// 			});
// 		}

// 		let response = await showtimeService.getShowtimeDetail(ShowtimeId);
// 		return res.status(200).json(response);
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(200).json({
// 			errCode: -1,
// 			errMessage: "Error from server",
// 		});
// 	}
// };

module.exports = {
	handleCreateNewShowtime: handleCreateNewShowtime,
	handleGetShowtimeByCinema: handleGetShowtimeByCinema,
	handleGetSeatsByShowtime: handleGetSeatsByShowtime,
	// handleGetDetailShowtime: handleGetDetailShowtime,
};
