import { where } from "sequelize";
import db from "../models/index";
import emailService from "./emailService";
import { at } from "lodash";

let createNewBooking = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			try {
				await emailService.sendSimpleEmail({
					reciverEmail: data.email,
					fullName: data.fullName,
					phoneNumber: data.phoneNumber,
					movieName: data.movieId,
					showDate: data.date,
					showTime: data.time,
					cinemaName: data.cinemaId,
					screenName: data.screenId,
					totalTickets: data.totalTickets,
					totalPrice: data.totalPrice,
					bookingDate: data.bookingDate,
					seatsSelected: data.seatsSelected,
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
			} catch (e) {
				resolve({
					errCode: 3,
					errMessage: "Mail không tồn tại!",
				});
			}
			resolve({
				errCode: 0,
				errMessage: "Create Booking success!",
			});
		} catch (e) {
			reject(e);
		}
	});
};

let createNewBookingSeat = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data || data.length === 0) {
				resolve({
					errCode: 2,
					errMessage: "Missing required parameter!",
				});
			}
			await db.BookingSeat.bulkCreate(data);
			resolve({
				errCode: 0,
				errMessage: "Create Booking Seat success!",
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getBookingByCinemaMovieScreenDateTime = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let dataBooking = await db.Booking.findAll({
				where: {
					cinemaId: data.cinema,
					movieId: data.movie,
					screenId: data.screen,
					time: data.time,
					date: data.date,
				},
				attributes: ["totalTickets"],
			});
			let totalBooking = 0;
			for (let i = 0; i < dataBooking.length; i++) {
				totalBooking += dataBooking[i].totalTickets;
			}
			resolve({
				errCode: 0,
				errMessage: "Create Booking success!",
				data: { totalBooking: totalBooking },
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getBookingSeats = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let dataBookingSeats = await db.BookingSeat.findAll({
				where: {
					cinema: data.cinema,
					screen: data.screen,
					date: data.date,
					time: data.time,
				},
				attributes: ["seat", "numberSeat"],
			});
			let result = {};
			let seat = dataBookingSeats.map((item) => {
				return item.seat;
			});
			let numberSeat = dataBookingSeats.map((item) => {
				return item.numberSeat;
			});
			result.seat = seat;
			result.numberSeat = numberSeat;
			resolve({
				errCode: 0,
				errMessage: "Get booking seats success!",
				data: result,
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewBooking: createNewBooking,
	getBookingByCinemaMovieScreenDateTime: getBookingByCinemaMovieScreenDateTime,
	createNewBookingSeat: createNewBookingSeat,
	getBookingSeats: getBookingSeats,
};
