import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/header/header";
import Post from "./components/post/post";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Post />
  </React.StrictMode>
);
