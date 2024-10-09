import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeList from "./pages/HomeList";
import AddList from "./pages/AddList";
import Update from "./pages/Update";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeList />} />
        <Route path="/add" element={<AddList />} />
        <Route path="/update/:id" element={<Update />} />

        {/* Router for pagination */}
        <Route path="/page/:page" element={<HomeList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
