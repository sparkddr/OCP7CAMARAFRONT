import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthContextProvider } from "./store/auth-context";

import Header from "./components/header/header";
import PostPage from "./pages/posts/postPage";
import AuthPage from "./pages/authPage";
import ProfilePage from "./pages/profilePage";
import SignalPage from "./pages/signals/signalsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signals" element={<SignalPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);
