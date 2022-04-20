import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthContextProvider } from "./store/auth-context";

import Header from "./components/header/header";
import Post from "./components/post/post";
import AuthPage from "./pages/authPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/posts" element={<Post />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);
