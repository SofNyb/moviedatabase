import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./pages/User/userPage.jsx";
import Navigation from "./Components/Nav/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register.jsx";
import Profile from "./pages/Login/Profile.jsx";
import BookmarkList from "./pages/BookmarkRating/BookmarkList.jsx";
import RatingList from "./pages/BookmarkRating/RatingList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="profile/:id" element={<UserPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookmark" element={<BookmarkList isPreview={false} />} />
        <Route path="rating" element={<RatingList isPreview={false} />} />
        <Route path="searchhistory" element={<div>Hej</div>} />

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
