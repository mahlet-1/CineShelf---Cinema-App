import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/layout/DashBoard";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashBoard />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<h1 className="text-2xl font-bold">Movies</h1>} />
          <Route path="/series" element={<h1 className="text-2xl font-bold">TV Series</h1>} />
          <Route path="/saved" element={<h1 className="text-2xl font-bold">My Watchlist</h1>} />
          <Route path="/profile" element={<h1 className="text-2xl font-bold"> Profile</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}