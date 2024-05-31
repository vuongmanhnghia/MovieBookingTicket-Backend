import db from "../models/index";

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

module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getSignin: getSignin,
};
