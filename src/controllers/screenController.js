import screenService from "../services/screenService";

let handleCreateNewScreen = async (req, res) => {
	let message = await screenService.createNewScreen(req.body);
	return res.status(200).json(message);
};

let handleGetDetailScreen = async (req, res) => {
	try {
		let ScreenId = req.query.cinemaId;
		if (!ScreenId) {
			return res.status(200).json({
				errCode: 3,
				errMessage: "Missing parameter",
			});
		}

		let response = await screenService.getScreenDetail(ScreenId);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server",
		});
	}
};

module.exports = {
	handleCreateNewScreen: handleCreateNewScreen,
	handleGetDetailScreen: handleGetDetailScreen,
};
