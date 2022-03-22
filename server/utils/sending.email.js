require("dotenv").config()
const nodemailer = require("nodemailer");

const sendingMail = ({ email, name, title, body }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: "priyanshushrama709@gmail.com",
            pass: "4tzqNHh8@Tr?G?Ca"
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