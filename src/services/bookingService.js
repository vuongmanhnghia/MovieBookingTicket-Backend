// import { raw } from "body-parser";

import { where } from "sequelize";
import db from "../models/index";
import emailService from "./emailService";
// import { raw } from "body-parser";

let createNewBooking = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await emailService.sendSimpleEmail({
				reciverEmail: data.email,
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				movieName: data.movieId,
				showDate: new Date(data.date),
				showTime: data.time,
				cinemaName: data.cinemaId,
				screenName: data.screenId,
				totalTickets: data.totalTickets,
				totalPrice: data.totalPrice,
				bookingDate: new Date(data.bookingDate),
			});

			await db.Booking.create({
				fullName: data.fullName,
				email: data.email,
				phoneNumber: data.phoneNumber,
				movieId: data.movieId,
				cinemaId: data.cinemaId,
				screenId: data.screenId,
				time: data.time,
				date: data.date,
				totalTickets: data.totalTickets,
				totalPrice: data.totalPrice,
				bookingDate: data.bookingDate,
			});
			resolve({
				errCode: 0,
				errMessage: "Create Booking success!",
			});
		} catch (e) {
			reject(e);
		}
	});
};

// let deleteBooking = (name) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			let Exits = await checkExist(name);
// 			if (!Exits) {
// 				resolve({
// 					errCode: 2,
// 					errMessage: "Booking not found!",
// 				});
// 			} else {
// 				await db.Booking.destroy({
// 					where: { name: name },
// 				});
// 				resolve({
// 					errCode: 0,
// 					errMessage: "Delete Booking success!",
// 				});
// 			}
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

// let getAllBookings = () => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			let Bookings = await db.Booking.findAll({
// 				attributes: {
// 					exclude: ["createdAt", "updatedAt"],
// 				},
// 			});
// 			resolve({
// 				errCode: 0,
// 				data: Bookings,
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

// let getBookingDetail = (tradeMark) => {
// 	return new Promise(async (resolve, reject) => {
// 		if (!tradeMark) {
// 			resolve({
// 				errCode: 1,
// 				errMessage: "Missing required parameter!",
// 			});
// 		}
// 		try {
// 			console.log(tradeMark);
// 			let data = [];
// 			let countData = await db.Booking.findAll({
// 				where: { tradeMark: tradeMark },
// 				attributes: {
// 					exclude: ["createdAt", "updatedAt"],
// 				},
// 			});
// 			await countData.map(async (item, index) => {
// 				item.image = new Buffer.from(item.image, "base64").toString(
// 					"binary"
// 				);
// 				item.background = new Buffer.from(
// 					item.background,
// 					"base64"
// 				).toString("binary");
// 				data.push(item);
// 			});
// 			resolve({
// 				errCode: 0,
// 				data: data,
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

// let getAllTradeMarks = () => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			let data = await db.Booking.findAll({
// 				attributes: ["tradeMark"],
// 			});
// 			resolve({
// 				errCode: 0,
// 				data: data,
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

// let getAllBookingByTradeMark = (tradeMark) => {
// 	return new Promise(async (resolve, reject) => {
// 		if (!tradeMark) {
// 			resolve({
// 				errCode: 1,
// 				errMessage: "Missing required parameter!",
// 			});
// 		}
// 		try {
// 			let data = await db.Booking.findAll({
// 				where: { tradeMark: tradeMark },
// 				attributes: {
// 					exclude: ["createdAt", "updatedAt"],
// 				},
// 			});
// 			resolve({
// 				errCode: 0,
// 				data: data,
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };

module.exports = {
	createNewBooking: createNewBooking,
	// deleteBooking: deleteBooking,
	// getAllBookings: getAllBookings,
	// getBookingDetail: getBookingDetail,
	// getAllTradeMarks: getAllTradeMarks,
	// getAllBookingByTradeMark: getAllBookingByTradeMark,
};
