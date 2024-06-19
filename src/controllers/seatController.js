import seatService from "../services/seatService";

let handleCreateNewSeat = async (req, res) => {
	let message = await seatService.createNewSeat(req.body);
	return res.status(200).json(message);
};

// let handleDeleteSeat = async (req, res) => {
// 	if (!req.body.name) {
// 		return res.status(200).json({
// 			errCode: 1,
// 			errMessage: "Missing required parameter! Please check again!",
// 		});
// 	}

// 	let message = await seatService.deleteSeat(req.body.name);
// 	return res.status(200).json(message);
// };

// let handleGetAllSeats = async (req, res) => {
// 	try {
// 		let response = await seatService.getAllSeats();
// 		return res.status(200).json(response);
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(200).json({
// 			errCode: -1,
// 			errMessage: "Error from server",
// 		});
// 	}
// };

// let handleGetDetailSeat = async (req, res) => {
// 	try {
// 		let tradeMark = req.query.id;
// 		let response = await seatService.getSeatDetail(tradeMark);
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
	handleCreateNewSeat: handleCreateNewSeat,
	// handleDeleteSeat: handleDeleteSeat,
	// handleGetAllSeats: handleGetAllSeats,
	// handleGetDetailSeat: handleGetDetailSeat,
};
