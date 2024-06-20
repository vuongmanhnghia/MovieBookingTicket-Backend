import bookingService from "../services/bookingService";

let handleCreateNewBooking = async (req, res) => {
	let message = await bookingService.createNewBooking(req.body);
	return res.status(200).json(message);
};

// let handleDeleteBooking = async (req, res) => {
// 	if (!req.body.name) {
// 		return res.status(200).json({
// 			errCode: 1,
// 			errMessage: "Missing required parameter! Please check again!",
// 		});
// 	}

// 	let message = await bookingService.deleteBooking(req.body.name);
// 	return res.status(200).json(message);
// };

// let handleGetAllBookings = async (req, res) => {
// 	try {
// 		let response = await bookingService.getAllBookings();
// 		return res.status(200).json(response);
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(200).json({
// 			errCode: -1,
// 			errMessage: "Error from server",
// 		});
// 	}
// };

// let handleGetDetailBooking = async (req, res) => {
// 	try {
// 		let tradeMark = req.query.id;
// 		let response = await bookingService.getBookingDetail(tradeMark);
// 		return res.status(200).json(response);
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(200).json({
// 			errCode: -1,
// 			errMessage: "Error from server",
// 		});
// 	}
// };

// let handleGetAllTradeMarks = async (req, res) => {
// 	try {
// 		let response = await bookingService.getAllTradeMarks();
// 		return res.status(200).json(response);
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(200).json({
// 			errCode: -1,
// 			errMessage: "Error from server",
// 		});
// 	}
// };

// let handleGetAllBookingByTradeMark = async (req, res) => {
// 	try {
// 		let tradeMark = req.query.tradeMark;
// 		let response = await bookingService.getAllBookingByTradeMark(tradeMark);
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
	handleCreateNewBooking: handleCreateNewBooking,
	// handleDeleteBooking: handleDeleteBooking,
	// handleGetAllBookings: handleGetAllBookings,
	// handleGetDetailBooking: handleGetDetailBooking,
	// handleGetAllTradeMarks: handleGetAllTradeMarks,
	// handleGetAllBookingByTradeMark: handleGetAllBookingByTradeMark,
};
