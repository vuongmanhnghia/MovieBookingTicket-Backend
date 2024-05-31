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
	console.log("--------------------------------------------");
	console.log(data);
	console.log("--------------------------------------------");

	return res.render("displayCRUD.ejs", {
		data: data,
	});
};

module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getSignin: getSignin,
	postSignin: postSignin,
	displayGetCRUD: displayGetCRUD,
};
