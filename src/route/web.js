import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.get("/about", homeController.getAboutPage);
	router.get("/signin", homeController.getSignin);
	router.post("/post-signin", homeController.postSignin);

	return app.use("/", router);
};

module.exports = initWebRoutes;
