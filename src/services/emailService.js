require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (data) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_APP,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	let info = await transporter.sendMail({
		from: '"Vuong Manh Nghia 👻" <vuongmanhnghia@gmail.com>',
		to: data.reciverEmail,
		subject: "Thông tin đặt vé xem phim ✔",
		html: `
      <h3>Xin chào ${data.fullName}!</h3>
		<p>Số điện thoại: ${data.phoneNumber}</p>
      <p>Chúc mừng bạn đã đặt vé thành công!</p>
		<p>Thông tin vé của bạn:</p>
		<div><b>Tên phim:</b> ${data.movieName}</div>
		<div><b>Ngày chiếu:</b> ${data.showDate}</div>
		<div><b>Giờ chiếu:</b> ${data.showTime}</div>
		<div><b>Rạp:</b> ${data.cinemaName}</div>
		<div><b>Phòng chiếu:</b> ${data.screenName}</div>
		<div><b>Tổng số vé:</b> ${data.totalTickets}</div>
		<div><b>Tổng tiền:</b> ${data.totalPrice}đ</div>
		<div><b>Ngày đặt:</b> ${data.bookingDate}</div>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
		<p>Chúc bạn xem phim vui vẻ!</p>`,
	});
};

module.exports = {
	sendSimpleEmail,
};
