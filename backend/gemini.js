import axios from "axios";

const geminiResponse = async (prompt) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL; // .env me pura endpoint with key

    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return result.data;
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
  }
};

export default geminiResponse;
