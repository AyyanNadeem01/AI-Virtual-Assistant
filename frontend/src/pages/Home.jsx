import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext, frontendImagesMap } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import aiGif from "../assets/ai.gif";
import userGif from "../assets/user.gif";

const Home = () => {
  const { getGeminiResponse, userData, serverUrl, setUserData } =
    useContext(UserDataContext);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const [alwaysListening, setAlwaysListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // NEW → hamburger state

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  // Text to speech
  const speak = (text) => {
    if (!text) return;
    setAiResponse(text);
    const utterance = new SpeechSynthesisUtterance(text);

    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle commands
  const handleCommand = (data) => {
    const { type, userInput, response } = data;

    switch (type) {
      case "google_search": {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        break;
      }
      case "youtube_search":
      case "youtube_play": {
        const query = encodeURIComponent(userInput);
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank"
        );
        break;
      }
      case "instagram_open": {
        window.open("https://www.instagram.com", "_blank");
        break;
      }
      case "facebook_open": {
        window.open("https://www.facebook.com", "_blank");
        break;
      }
      case "calculator_open": {
        window.open(
          "https://www.online-calculator.com/full-screen-calculator/",
          "_blank"
        );
        break;
      }
      case "weather-show": {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
        break;
      }
      case "general":
      case "get_day":
      case "get_time":
      case "get_month":
      case "get_date": {
        speak(response);
        break;
      }
      default:
        console.warn("Command type not handled:", type);
        break;
    }
  };

  // Voice recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("❌ SpeechRecognition not supported.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
    }

    const recognition = recognitionRef.current;

    recognition.onresult = async (e) => {
      const lastResult = e.results[e.results.length - 1];
      if (!lastResult.isFinal) return;

      const transcript = lastResult[0].transcript.trim();
      console.log("🎤 Final Voice:", transcript);

      let data = null;

      if (alwaysListening) {
        data = await getGeminiResponse(transcript);
      } else if (
        userData?.assistantName &&
        transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase())
      ) {
        console.log("🟢 Wake word detected:", userData.assistantName);
        data = await getGeminiResponse(transcript);
      }

      if (data) {
        console.log("🤖 Gemini Response:", data);
        handleCommand(data);
      }
    };

    recognition.onerror = (e) => {
      if (e.error !== "aborted")
        console.warn("⚠️ Speech recognition error:", e.error);
    };

    recognition.onend = () => {
      if (alwaysListening || userData?.assistantName) {
        console.log("🔄 Recognition ended → restarting…");
        try {
          recognition.start();
        } catch (err) {
          console.warn("Recognition already running");
        }
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.warn("Recognition already running");
    }

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.stop();
    };
  }, [userData, getGeminiResponse, alwaysListening]);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-t from-black to-[#02026df4] gap-[15px] relative">
      {/* ========== Buttons Section ========== */}
      {/* Desktop buttons */}
      <div className="hidden sm:flex flex-col gap-4 absolute top-[20px] right-[20px]">
        <button
          onClick={handleLogout}
          className="text-black font-semibold text-[19px] min-w-[150px] h-[50px] bg-white rounded-full transition-all duration-300 hover:bg-blue-400 hover:text-white active:scale-95"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/customize")}
          className="text-black font-semibold text-[17px] min-w-[200px] h-[50px] bg-white rounded-full transition-all duration-300 hover:bg-blue-400 hover:text-white active:scale-95"
        >
          Customize Assistant
        </button>

        <button
          onClick={() => setAlwaysListening((prev) => !prev)}
          className={`font-semibold text-[15px] min-w-[500px] h-[50px] rounded-full transition-all duration-300 active:scale-95 ${
            alwaysListening
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-white text-black hover:bg-blue-400 hover:text-white"
          }`}
        >
          {alwaysListening ? "🟢 Always Listening" : "🎧 Manual Listening without saying wake up (my name)"}
        </button>
      </div>

      {/* Mobile hamburger */}
      <div className="sm:hidden absolute top-[20px] right-[20px]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-[220px] bg-white rounded-xl shadow-lg flex flex-col gap-2 p-3 z-50">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-blue-400 hover:text-white"
            >
              Logout
            </button>

            <button
              onClick={() => navigate("/customize")}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-blue-400 hover:text-white"
            >
              Customize Assistant
            </button>

            <button
              onClick={() => setAlwaysListening((prev) => !prev)}
              className={`px-4 py-2 rounded-md ${
                alwaysListening
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {alwaysListening ? "🟢 Always Listening" : "🎧 Manual Listening without saying wake up (my name)"}
            </button>
          </div>
        )}
      </div>

      {/* ========== Assistant Section ========== */}
      <div className="shadow-lg w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl">
        <img
          src={
            userData?.assistantImage
              ? frontendImagesMap[userData.assistantImage] ||
                userData.assistantImage
              : ""
          }
          alt="assistant"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-[18px] text-white mt-2">
        I'm {userData?.assistantName || "Your Assistant"}
      </h1>

      <p className="text-white mt-4 text-sm opacity-80 text-center px-2">
        👉 Say "<b>{userData?.assistantName || "Assistant"}</b>" to wake me up.
        <br />
        🎤 Example: "{userData?.assistantName || "Assistant"}, what’s the weather?"
        <br />
        {alwaysListening && "⚡ Currently responding without wake word!"}
      </p>

      <div className="w-[200px] h-[200px] mt-4 rounded-2xl overflow-hidden shadow-md">
        <img
          src={isSpeaking ? ai.gif : user.gif}
          alt="speaking-state"
          className="w-full h-full object-cover"
        />
      </div>

      {aiResponse && (
        <p className="mt-3 text-white text-center max-w-[90%] px-4">
          {aiResponse}
        </p>
      )}
    </div>
  );
};

export default Home;
