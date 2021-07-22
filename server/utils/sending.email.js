require("dotenv").config()
const nodemailer = require("nodemailer");

const sendingMail = ({ email, name, title, body }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
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