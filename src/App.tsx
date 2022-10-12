import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fortune from "./pages/Fortune";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/fortune" element={<Fortune />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
