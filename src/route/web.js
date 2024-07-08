import express from "express";
import userController from "../controllers/userController";
import movieController from "../controllers/movieController";
import cinemaController from "../controllers/cinemaController";
import screenController from "../controllers/screenController";
import showtimeController from "../controllers/showtimeController";
import seatController from "../controllers/seatController";
import bookingController from "../controllers/bookingController";

let router = express.Router();

let initWebRoutes = (app) => {
	// user
	router.post("/api/login", userController.handleLogin);
	router.get("/api/get-all-users", userController.handleGetAllUsers);
	router.post("/api/create-new-user", userController.handleCreateNewUser);
	router.put("/api/edit-user", userController.handleEditUser);
	router.delete("/api/delete-user", userController.handleDeleteUser);
	router.get("/api/allcode", userController.getAllCode);

	// movie
	router.post("/api/create-new-movie", movieController.handleCreateNewMovie);
	router.delete("/api/delete-movie", movieController.handleDeleteMovie);
	router.get("/api/get-top-movies", movieController.handleGetTopMovies);
	router.get("/api/get-all-movies", movieController.handleGetAllMovies);
	router.get("/api/get-detail-movie", movieController.handleGetDetailMovie);
	router.get("/api/get-movies", movieController.handleGetMoviesPage);
	router.get(
		"/api/get-review-movies",
		movieController.handleGetReviewMoviesPage
	);

	// cinema
	router.post(
		"/api/create-new-cinema",
		cinemaController.handleCreateNewCinema
	);
	router.delete("/api/delete-cinema", cinemaController.handleDeleteCinema);
	router.get("/api/get-all-cinemas", cinemaController.handleGetAllCinemas);
	router.get("/api/get-detail-cinema", cinemaController.handleGetDetailCinema);
	router.get(
		"/api/get-all-trademarks",
		cinemaController.handleGetAllTradeMarks
	);
	router.get(
		"/api/get-all-cinemas-by-trademark",
		cinemaController.handleGetAllCinemaByTradeMark
	);
	router.get(
		"/api/get-tradeMark-by-cinema",
		cinemaController.handleGetTradeMarkByCinema
	);

	// screen
	router.post(
		"/api/create-new-screen",
		screenController.handleCreateNewScreen
	);
	router.get("/api/get-detail-screen", screenController.handleGetDetailScreen);

	// showtime
	router.post(
		"/api/create-new-showtime",
		showtimeController.handleCreateNewShowtime
	);
	router.get(
		"/api/get-showtime-by-cinema",
		showtimeController.handleGetShowtimeByCinema
	);
	router.post(
		"/api/get-seats-by-showtime",
		showtimeController.handleGetSeatsByShowtime
	);
	router.get(
		"/api/get-showtime-by-cinema-and-date",
		showtimeController.handleGetShowtimeByCinemaAndDate
	);
	router.get(
		"/api/get-showtime-by-movie-and-date-and-trademark",
		showtimeController.handleGetShowtimeByCinemaAndDateAndMovie
	);

	// Seat
	router.post("/api/create-new-seat", seatController.handleCreateNewSeat);

	// Booking
	router.post(
		"/api/create-new-booking",
		bookingController.handleCreateNewBooking
	);
	router.post(
		"/api/get-booking-by-cinema-movie-screen-date-time",
		bookingController.handleGetBookingByCinemaMovieScreenDateTime
	);

	return app.use("/", router);
};
module.exports = initWebRoutes;
