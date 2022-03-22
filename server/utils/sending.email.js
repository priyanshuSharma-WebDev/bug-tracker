require("dotenv").config()
const nodemailer = require("nodemailer");

const sendingMail = ({ email, name, title, body }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_KEY
        }
    })

    let mailOptions = {
        from: "priyanshushrama709@gmail.com",
        to: email,
        subject: title,
        html: `Dear ${name} - ${body}`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) return console.error(err);
    })
}

module.exports = sendingMail;