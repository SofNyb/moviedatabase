import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Names from "./Components/Names.jsx";
import NameNconst from "./Components/NameNconst.jsx";
import Titles from "./Components/Titles.jsx";
import Title from "./Components/Title.jsx";
import Cast from "./Components/Cast.jsx";
import Genre from "./Components/Genre.jsx";
import Episode from "./Components/Episode.jsx";
import Award from "./Components/Award.jsx";
import OverallRating from "./Components/OverallRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" />
        <Route path="register" />

        <Route path="profile/:id">
          <Route path="bookmark" />
          <Route path="rating" />
          <Route path="searchhistory" />
        </Route>

    <Route path="title" element={<Titles />} />
    <Route path="title/:tconst" element={<Title />}>
      <Route path="cast" element={<Cast />} />
      <Route path="genre" element={<Genre />} />
      <Route path="episode" element={<Episode />} />
      <Route path="award" element={<Award />} />
      <Route path="overallrating" element={<OverallRating />} />
    </Route>

        <Route path="name" element={<Names />} />
        <Route path="name/:nconst" element={<NameNconst />} >
          <Route path="knownfor" />
          <Route path="profession" />
          <Route path="role" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
