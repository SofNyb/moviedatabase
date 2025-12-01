import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./User/userPage.jsx";
import Navigation from "./Components/Navbar.jsx";
import Signin from "./Login/Signin.jsx";
import Bookmark from "./User/Bookmark.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Signin />} />
        <Route path="register" />

        <Route path="profile/:id" element={<UserPage />}>
          <Route path="bookmark" />
          <Route path="rating" />
          <Route path="searchhistory" />
        </Route>

        <Route path="title" />
        <Route path="title/:tconst">
          <Route path="cast" />
          <Route path="genre" />
          <Route path="episode" />
          <Route path="award" />
          <Route path="overallrating" />
          <Route path="principals" />
        </Route>

        <Route path="name" />
        <Route path="name/:nconst">
          <Route path="knownfor" />
          <Route path="profession" />
          <Route path="role" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
