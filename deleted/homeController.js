import db from "../models/index";
import SigninService from "../services/SigninService";

let getHomePage = async (req, res) => {
	try {
		let data = await db.User.findAll();
		return res.render("homePage.ejs", {
			data: JSON.stringify(data),
		});
	} catch (e) {
		console.log(e);
	}
};

let getAboutPage = (req, res) => {
	return res.render("test/about.ejs");
};

let getSignin = (req, res) => {
	return res.render("signin.ejs");
};

let postSignin = async (req, res) => {
	let message = await SigninService.createNewUser(req.body);
	console.log(message);
	return res.send("Post Signin");
};

let displayGetCRUD = async (req, res) => {
	let data = await SigninService.getAllUser();
	return res.render("displayCRUD.ejs", {
		data: data,
	});
};

let getUpdateCRUD = async (req, res) => {
	let userId = req.query.id;
	if (userId) {
		let userDate = await SigninService.getUserInfoById(userId);
		// check userId not found in DB
		// let userDate
		return res.render("updateCRUD.ejs", {
			user: userDate,
		});
	} else {
		return res.send("User not found");
	}
};

let putCRUD = async (req, res) => {
	let data = req.body;
	let allUsers = await SigninService.updateUserData(data);
	return res.render("displayCRUD.ejs", {
		data: allUsers,
	});
};

let deleteCRUD = async (req, res) => {
	let userId = req.query.id;
	if (userId) {
		await SigninService.deleteUserById(userId);
		return res.send("Delete user success");
	} else {
		return res.send("User not found");
	}
};

module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getSignin: getSignin,
	postSignin: postSignin,
	displayGetCRUD: displayGetCRUD,
	getUpdateCRUD: getUpdateCRUD,
	putCRUD: putCRUD,
	deleteCRUD: deleteCRUD,
};
