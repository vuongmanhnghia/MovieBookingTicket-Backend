import { where } from "sequelize";
import db from "../models/index";
import emailService from "./emailService";

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

let getTotalBooking = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await db.Booking.findAndCountAll({
				where: { status: "active" },
			});
			if (data) {
				resolve({
					errCode: 0,
					data: data,
				});
			} else {
				resolve({
					errCode: 1,
					errMessage: "Error!",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewBooking: createNewBooking,
	getTotalBooking: getTotalBooking,
};
