const Razorpay = require("razorpay");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// console.log(process.env.RAZOR_KEY);
// console.log(process.env.RAZOR_SECRET);
exports.instance = new Razorpay({
	// key_id: process.env.RAZORPAY_KEY,
	// key_secret: process.env.RAZORPAY_SECRET,


	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});
