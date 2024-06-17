import express from "express";
import userController from "../controllers/userController";
import movieController from "../controllers/movieController";
import cinemaController from "../controllers/cinemaController";
import screenController from "../controllers/screenController";
import showtimeController from "../controllers/showtimeController";

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

	// cinema
	router.post(
		"/api/create-new-cinema",
		cinemaController.handleCreateNewCinema
	);
	router.delete("/api/delete-cinema", cinemaController.handleDeleteCinema);
	router.get("/api/get-all-cinemas", cinemaController.handleGetAllCinemas);
	router.get("/api/get-detail-cinema", cinemaController.handleGetDetailCinema);

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

	return app.use("/", router);
};
module.exports = initWebRoutes;
