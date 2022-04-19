import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/header";
import Post from "./components/post/post";
import AuthPage from "./pages/authPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
