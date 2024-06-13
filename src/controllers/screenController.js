import screenService from "../services/screenService";

let handleCreateNewScreen = async (req, res) => {
	let message = await screenService.createNewScreen(req.body);
	return res.status(200).json(message);
};

module.exports = {
	handleCreateNewScreen: handleCreateNewScreen,
};
