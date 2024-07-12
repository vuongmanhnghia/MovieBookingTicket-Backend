require("dotenv").config();
import nodemailer from "nodemailer";
import moment from "moment";

let sendSimpleEmail = async (data) => {
	let seatsSelected = data.seatsSelected;
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_APP,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	await transporter.sendMail({
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
		<div><b>Ghế đã chọn:</b> ${seatsSelected.join(", ")}</div>
		<div><b>Tổng số tiền:</b> ${data.totalPrice}đ</div>
		<div><b>Thời gian đặt vé :</b> ${moment(data.bookingDate, "HH:mm").format(
			"hh:mm A - DD/MM/YYYY"
		)}</div>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
		<b><p>Chúc bạn xem phim vui vẻ!</p></b>`,
	});
};

module.exports = {
	sendSimpleEmail,
};
