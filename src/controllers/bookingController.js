import bookingService from "../services/bookingService";

let handleCreateNewBooking = async (req, res) => {
	let message = await bookingService.createNewBooking(req.body);
	return res.status(200).json(message);
};

let handleGetBookingByCinemaMovieScreenDateTime = async (req, res) => {
	let data = await bookingService.getBookingByCinemaMovieScreenDateTime(
		req.query
	);
	return res.status(200).json(data);
};

module.exports = {
	handleCreateNewBooking: handleCreateNewBooking,
	handleGetBookingByCinemaMovieScreenDateTime:
		handleGetBookingByCinemaMovieScreenDateTime,
};
