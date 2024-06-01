import userService from "../services/userService";
const e = require("express");

let handleLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		return res.status(500).json({
			errCode: 1,
			messenge: "Email or password is required!",
		});
	}
	let userData = await userService.handleUserLogin(email, password);

	return res.status(200).json({
		errCode: userData.errCode,
		errMessage: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
};
module.exports = {
	handleLogin: handleLogin,
};
