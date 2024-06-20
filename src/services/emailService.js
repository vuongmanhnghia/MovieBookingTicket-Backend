require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (reciverEmail) => {
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
		to: reciverEmail,
		subject: "Thông tin đặt vé xem phim ✔",
		html: `
      <h3>Xin chào!</h3>
      <p>Chúc mừng bạn đã đặt vé thành công!</p>`,
	});
};

module.exports = {
	sendSimpleEmail,
};
