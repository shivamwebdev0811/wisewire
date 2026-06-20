const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config();

const mailSender = async (email, title, body) => {

  console.log(process.env.MAIL_USER);
  console.log(process.env.MAIL_PASS);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: `"WiseWire" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender
