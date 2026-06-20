const { GoogleGenAI } = require("@google/genai")
const Course = require("../models/Course")

exports.handleChat = async (req, res) => {
  try {
    const { history, message } = req.body

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "Gemini API key is missing" })
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    // Fetch all published courses to feed as context
    const publishedCourses = await Course.find({ status: "Published" })
      .populate("category")
      .exec()

    // Format course data for the AI
    let courseContext = "You are an AI assistant for WiseWire, an EdTech platform.\n"
    courseContext += "Here is the list of courses currently available on WiseWire:\n\n"

    publishedCourses.forEach((course) => {
      courseContext += `- Title: ${course.courseName}\n`
      courseContext += `  Description: ${course.courseDescription}\n`
      courseContext += `  Price: ₹${course.price}\n`
      if (course.category) {
        courseContext += `  Category: ${course.category.name}\n`
      }
      courseContext += `  Tags: ${course.tag.join(", ")}\n\n`
    })

    courseContext += `Your job is to assist users with their questions, recommend courses from the list above, and provide helpful learning advice. 
Do not make up courses that do not exist in the list. Always be polite, professional, and concise. 
If a user asks a technical question, provide a clear and educational solution.
Format your responses using Markdown.`

    // Format history for the Gemini API
    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }))

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ]

    let response;
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.0-flash", 
          contents: contents,
          config: {
            systemInstruction: courseContext,
          }
        });
        break; // Success, exit retry loop
      } catch (err) {
        if (err.status === 503 && retries > 1) {
          console.warn(`Gemini API overloaded. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
          retries--;
        } else {
          throw err; // Re-throw if it's not a 503 or we ran out of retries
        }
      }
    }

    return res.status(200).json({
      success: true,
      reply: response.text
    })

  } catch (error) {
    console.error("Chatbot Error:", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while communicating with the AI",
      error: error.message,
    })
  }
}
