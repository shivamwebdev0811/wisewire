const express = require("express")
const router = express.Router()

const { handleChat } = require("../controllers/Chatbot")

// Define the route for chatbot
router.post("/chat", handleChat)

module.exports = router

