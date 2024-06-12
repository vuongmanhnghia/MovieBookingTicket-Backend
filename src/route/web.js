import express from "express";
import userController from "../controllers/userController";
import movieController from "../controllers/movieController";

let router = express.Router();

let initWebRoutes = (app) => {
	// user
	router.post("/api/login", userController.handleLogin);
	router.get("/api/get-all-users", userController.handleGetAllUsers);
	router.post("/api/create-new-user", userController.handleCreateNewUser);
	router.put("/api/edit-user", userController.handleEditUser);
	router.delete("/api/delete-user", userController.handleDeleteUser);

	// movie
	router.post("/api/create-new-movie", movieController.handleCreateNewMovie);
	router.delete("/api/delete-movie", movieController.handleDeleteMovie);

	router.get("/api/allcode", userController.getAllCode);

	router.get("/api/get-top-movies", movieController.handleGetTopMovies);
	router.get("/api/get-all-movies", movieController.handleGetAllMovies);
	return app.use("/", router);
};

module.exports = initWebRoutes;
