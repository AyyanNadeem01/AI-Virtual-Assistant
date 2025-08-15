import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import { UserDataContext } from "./context/userContext";

function App() {
  const { userData, isLoading } = useContext(UserDataContext);

  // Show loading until user data is fetched
  if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;

  const isLoggedIn = !!userData;
  const isProfileComplete = userData?.assistantImage && userData?.assistantName;

  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <Navigate to="/signin" />
          ) : isProfileComplete ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />

      {/* SignUp Route */}
      <Route
        path="/signup"
        element={
          !isLoggedIn ? (
            <SignUp />
          ) : isProfileComplete ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />

      {/* SignIn Route */}
      <Route
        path="/signin"
        element={
          !isLoggedIn ? (
            <SignIn />
          ) : isProfileComplete ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />

      {/* Customize Route */}
      <Route
        path="/customize"
        element={isLoggedIn ? <Customize /> : <Navigate to="/signin" />}
      />

      {/* Customize2 Route */}
      <Route
        path="/customize2"
        element={isLoggedIn ? <Customize2 /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;
