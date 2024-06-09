import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import movieController from "../controllers/movieController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.get("/about", homeController.getAboutPage);
	router.get("/signin", homeController.getSignin);
	router.post("/post-signin", homeController.postSignin);
	router.get("/get-crud", homeController.displayGetCRUD);
	router.get("/update-crud", homeController.getUpdateCRUD);
	router.post("/put-crud", homeController.putCRUD);
	router.get("/delete-crud", homeController.deleteCRUD);

	router.post("/api/login", userController.handleLogin);
	router.get("/api/get-all-users", userController.handleGetAllUsers);
	router.post("/api/create-new-user", userController.handleCreateNewUser);
	router.put("/api/edit-user", userController.handleEditUser);
	router.delete("/api/delete-user", userController.handleDeleteUser);
	router.get("/api/get-movie-home", movieController.getTopMoviesHome);

	router.get("/api/allcode", userController.getAllCode);

	return app.use("/", router);
};

module.exports = initWebRoutes;
