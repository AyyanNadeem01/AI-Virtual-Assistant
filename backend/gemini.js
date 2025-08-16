import axios from "axios";

const geminiResponse = async (command, assistantName,userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL; // .env me pura endpoint with key
    const prompt=`You are a virtual assistant named ${assistantName} created by
    ${userName}.    
    You are not Google. You will now behave like a voice-anabled assistant.

    Your task is to understand user's natural language input and respond with a JSON
    Object like this:
    
    {"type":"general" | "google_search" | "youtube_search" |  "youtube_play" |
    "get_time" | "get_date" | "get_day" | "get_month"| "calculator_open" |
    "instagram_open" | "facebook_open" | "weather-show",
    "userInput" : "<original user input>" {only remove your name from  userinput if 
    exists} and agr kisi ne google ya youtube pe kuch search karne ko bola hai tou
    userInput me only bo search baala text jaye,
    "response": "<a short spoken response to read out loud to the user>"
    }

    Instructions:
    -"type":determine the intent of the user.
    -"userinput": original sentence the user spoke.
    -"response":A short voice-friendly reply e.g., "Sure,
      It now", "Here's what I found", "Today is Tuesday", etc.


    Type meaning:
    -"general": If it's a factual or informational question.
    -"google_search": If user wants to search something on Google.
    -"youtube_search": If user wants to search something on Youtube.
    -"youtube_play": If user wants to directly play a video or song.
    -"calculator_open":If user want to open a calculator.
    -"instagram_open":If user want to open instagram.
    -"facbook_open":If user want to open facebook.
    -"weather-show": If user want to know weather
    -"get_time": If user ask for current time.
    -"get_date":If user ask for today's date.
    -"get_day":If user ask for what today is.
    -"get_month":If user ask for current month.

    Important:
    -Use "{authorName}" agar koi puche tume kisne banaya
    -Only respond with the JSON object, nothing else.
    
    
    now your userInput - ${command} `

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

    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
  }
};

export default geminiResponse;
