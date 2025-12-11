import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NamesList from "./pages/Name/NamesList.jsx";
import NameNconst from "./pages/Name/NameNconst.jsx";

import Titles from "./pages/Title/Titles.jsx";
import Title from "./pages/Title/Title.jsx";
import Cast from "./Components/Cast.jsx";
import Genre from "./Components/Genre.jsx";
import Episode from "./Components/Episode.jsx";
import Award from "./Components/Award.jsx";
import OverallRating from "./Components/OverallRating.jsx";

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

        <Route path="profile" element={<UserPage />} />
        <Route path="profile/edit" element={<Profile />} />
        <Route path="bookmark" element={<BookmarkList isPreview={false} />} />
        <Route path="rating" element={<RatingList isPreview={false} />} />
        <Route path="searchhistory" element={<div>Hej</div>} />

        <Route path="titles" element={<Titles />} />
        <Route path="titles/:tconst" element={<Title />}>
          <Route path="cast" element={<Cast />} />
          <Route path="genre" element={<Genre />} />
          <Route path="episode" element={<Episode />} />
          <Route path="award" element={<Award />} />
          <Route path="overallrating" element={<OverallRating />} />
        </Route>

        <Route path="names" element={<NamesList />} />
        <Route path="names/:nconst" element={<NameNconst />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
