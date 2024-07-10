import bookingService from "../services/bookingService";

let handleCreateNewBooking = async (req, res) => {
	let message = await bookingService.createNewBooking(req.body);
	return res.status(200).json(message);
};

let handleGetBookingByCinemaMovieScreenDateTime = async (req, res) => {
	let response = await bookingService.getBookingByCinemaMovieScreenDateTime(
		req.body
	);
	return res.status(200).json(response);
};

let handleCreateNewBookingSeat = async (req, res) => {
	let message = await bookingService.createNewBookingSeat(req.body);
	return res.status(200).json(message);
};

module.exports = {
	handleCreateNewBooking: handleCreateNewBooking,
	handleGetBookingByCinemaMovieScreenDateTime:
		handleGetBookingByCinemaMovieScreenDateTime,
	handleCreateNewBookingSeat: handleCreateNewBookingSeat,
};
