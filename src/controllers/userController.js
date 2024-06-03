import userService from "../services/userService";
const e = require("express");

let handleLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		return res.status(500).json({
			errCode: 1,
			message: "Email or password is required!",
		});
	}
	let userData = await userService.handleUserLogin(email, password);

	return res.status(200).json({
		errCode: userData.errCode,
		errMessage: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
};

let handleGetAllUsers = async (req, res) => {
	let id = req.query.id; //all, id
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameter! Please check again!",
			users: [],
		});
	}
	let users = await userService.getAllUsers(id);
	console.log(users);
	return res.status(200).json({
		errCode: 0,
		errMessage: "Ok",
		users,
	});
};

module.exports = {
	handleLogin: handleLogin,
	handleGetAllUsers: handleGetAllUsers,
};
